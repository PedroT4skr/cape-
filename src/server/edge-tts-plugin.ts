import type { IncomingMessage, ServerResponse } from 'node:http'
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'

export function edgeTtsPlugin() {
  return {
    name: 'vite-edge-tts-proxy',
    configureServer(server: any) {
      server.middlewares.use('/api/tts', async (req: IncomingMessage, res: ServerResponse) => {
        try {
          const reqUrl = new URL(req.url || '', 'http://localhost')
          const text = reqUrl.searchParams.get('text')?.trim()
          const voice = reqUrl.searchParams.get('voice')?.trim() || 'pt-BR-FranciscaNeural'

          if (!text) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Parâmetro "text" é obrigatório' }))
            return
          }

          const tts = new MsEdgeTTS()
          await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)

          const { audioStream } = tts.toStream(text)

          res.statusCode = 200
          res.setHeader('Content-Type', 'audio/mpeg')
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
          res.setHeader('Access-Control-Allow-Origin', '*')

          audioStream.on('error', (err) => {
            console.error('[EdgeTTS Proxy] Stream error:', err)
            tts.close()
            if (!res.headersSent) {
              res.statusCode = 502
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Erro ao transmitir áudio' }))
            }
          })

          audioStream.on('end', () => {
            tts.close()
          })

          audioStream.pipe(res)
        } catch (err: any) {
          console.error('[EdgeTTS Proxy] Erro na síntese:', err?.message || err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Falha no sintetizador Edge-TTS', details: err?.message }))
          }
        }
      })
    }
  }
}
