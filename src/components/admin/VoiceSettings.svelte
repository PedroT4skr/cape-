<script lang="ts">
  import { onMount } from 'svelte'
  import { speechService, type TtsEngine } from '../../services/speech.service'
  import { Volume2, Check, Sparkles, Play, Smartphone, Square } from '@lucide/svelte'

  interface VoiceItem {
    id: string
    name: string
    avatar: string
    subtitle: string
    engine: TtsEngine
  }

  // Catálogo simplificado e humanizado das vozes de estúdio recomendadas
  const RECOMMENDED_VOICES: VoiceItem[] = [
    {
      id: 'pt-BR-FranciscaNeural',
      name: 'Francisca',
      avatar: '👩',
      subtitle: 'Voz feminina doce, calma e afetuosa (ideal para crianças e autismo)',
      engine: 'edge'
    },
    {
      id: 'pt-BR-AntonioNeural',
      name: 'Antônio',
      avatar: '👨',
      subtitle: 'Voz masculina clara, firme e didática',
      engine: 'edge'
    },
    {
      id: 'pt-BR-ThalitaMultilingualNeural',
      name: 'Thalita',
      avatar: '👧',
      subtitle: 'Voz jovem, alegre e dinâmica',
      engine: 'edge'
    }
  ]

  let currentTab = $state<'recommended' | 'device'>('recommended')
  let currentEngine = $state<TtsEngine>('edge')
  let nativeVoices = $state<{ name: string; cleanName: string }[]>([])
  let testingVoiceId = $state<string | null>(null)

  function cleanDeviceVoiceName(rawName: string): string {
    return rawName
      .replace(/^Microsoft\s+/i, '')
      .replace(/^Google\s+/i, '')
      .replace(/\s*-\s*Portuguese.*$/i, '')
      .replace(/\s*\(Brazil\)/i, '')
      .replace(/\s*Desktop/i, '')
      .trim()
  }

  function refreshVoiceState() {
    currentEngine = speechService.getEngine()
    const rawList = speechService.getPortugueseVoices()
    nativeVoices = rawList.map((item) => ({
      name: item.voice.name,
      cleanName: cleanDeviceVoiceName(item.voice.name)
    }))
  }

  onMount(() => {
    refreshVoiceState()
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        refreshVoiceState()
      }
    }
  })

  function isVoiceActive(voice: VoiceItem | { name: string }): boolean {
    if ('engine' in voice) {
      return speechService.isEdgeVoiceActive(voice.id)
    } else {
      return speechService.isNativeVoiceActive(voice.name)
    }
  }

  async function handleSelectRecommended(voice: VoiceItem) {
    speechService.selectEdgeVoice(voice.id)
    refreshVoiceState()
    await handleTestRecommended(voice)
  }

  function handleSelectDevice(voiceName: string) {
    speechService.selectNativeVoice(voiceName)
    refreshVoiceState()
    handleTestDevice(voiceName)
  }

  async function handleTestRecommended(voice: VoiceItem) {
    if (testingVoiceId) {
      speechService.stop()
      testingVoiceId = null
      return
    }

    testingVoiceId = voice.id
    try {
      await speechService.testEdgeVoice(
        voice.id,
        `Olá! Eu sou a voz da ${voice.name}. Vamos conversar e aprender juntos!`
      )
    } finally {
      testingVoiceId = null
    }
  }

  function handleTestDevice(voiceName: string) {
    if (testingVoiceId) {
      speechService.stop()
      testingVoiceId = null
      return
    }

    testingVoiceId = voiceName
    speechService.testNativeVoice(
      voiceName,
      'Olá! Esta é a voz padrão do seu aparelho para o aluno.'
    )

    setTimeout(() => {
      if (testingVoiceId === voiceName) {
        testingVoiceId = null
      }
    }, 2800)
  }
</script>

<div class="voice-card">
  <!-- Topo Simples e Direto -->
  <div class="card-header">
    <div class="header-icon">
      <Volume2 size={24} color="#2563EB" />
    </div>
    <div class="header-titles">
      <h3 class="title">VOZ DA PRANCHA</h3>
      <p class="subtitle">
        Escolha quem vai falar quando a criança tocar nos cartões e frases.
      </p>
    </div>
  </div>

  <!-- Abas Claras e Sem Jargão -->
  <div class="tabs-bar">
    <button
      class="tab-btn {currentTab === 'recommended' ? 'active' : ''}"
      onclick={() => (currentTab = 'recommended')}
    >
      <Sparkles size={16} />
      <span class="tab-label-full">VOZES SUAVES E NATURAIS</span>
      <span class="tab-label-short">ESTÚDIO</span>
    </button>
    <button
      class="tab-btn {currentTab === 'device' ? 'active' : ''}"
      onclick={() => (currentTab = 'device')}
    >
      <Smartphone size={16} />
      <span class="tab-label-full">OUTRAS VOZES DO APARELHO</span>
      <span class="tab-label-short">DO APARELHO</span>
    </button>
  </div>

  <!-- Lista de Vozes Recomendadas -->
  {#if currentTab === 'recommended'}
    <div class="voices-list">
      {#each RECOMMENDED_VOICES as item (item.id)}
        {@const active = isVoiceActive(item)}
        <div class="voice-item {active ? 'selected-row' : ''}">
          <div class="avatar-wrap">
            <span class="avatar-emoji">{item.avatar}</span>
          </div>

          <div class="info-wrap">
            <div class="name-line">
              <span class="voice-title">{item.name}</span>
              {#if active}
                <span class="active-badge">
                  <Check size={13} strokeWidth={3} />
                  <span>EM USO</span>
                </span>
              {/if}
            </div>
            <p class="voice-desc">{item.subtitle}</p>
          </div>

          <div class="btn-group">
            <button
              class="listen-btn {testingVoiceId === item.id ? 'is-playing' : ''}"
              onclick={() => handleTestRecommended(item)}
              aria-label="Ouvir voz de exemplo"
            >
              {#if testingVoiceId === item.id}
                <Square size={14} fill="#2563EB" />
                <span>PARAR</span>
              {:else}
                <Play size={14} fill="#334155" />
                <span>OUVIR</span>
              {/if}
            </button>

            {#if !active}
              <button
                class="use-btn"
                onclick={() => handleSelectRecommended(item)}
              >
                <span>USAR ESTA</span>
              </button>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <!-- Lista de Vozes do Dispositivo -->
    <div class="voices-list">
      {#if nativeVoices.length === 0}
        <div class="empty-state">
          Nenhuma outra voz encontrada no aparelho.
        </div>
      {:else}
        {#each nativeVoices as voice (voice.name)}
          {@const active = isVoiceActive(voice)}
          <div class="voice-item {active ? 'selected-row' : ''}">
            <div class="avatar-wrap device-avatar">
              <Smartphone size={20} color="#64748B" />
            </div>

            <div class="info-wrap">
              <div class="name-line">
                <span class="voice-title">{voice.cleanName}</span>
                {#if active}
                  <span class="active-badge">
                    <Check size={13} strokeWidth={3} />
                    <span>EM USO</span>
                  </span>
                {/if}
              </div>
              <p class="voice-desc">Voz instalada no sistema</p>
            </div>

            <div class="btn-group">
              <button
                class="listen-btn {testingVoiceId === voice.name ? 'is-playing' : ''}"
                onclick={() => handleTestDevice(voice.name)}
                aria-label="Ouvir voz de exemplo"
              >
                {#if testingVoiceId === voice.name}
                  <Square size={14} fill="#2563EB" />
                  <span>PARAR</span>
                {:else}
                  <Play size={14} fill="#334155" />
                  <span>OUVIR</span>
                {/if}
              </button>

              {#if !active}
                <button
                  class="use-btn"
                  onclick={() => handleSelectDevice(voice.name)}
                >
                  <span>USAR ESTA</span>
                </button>
              {/if}
            </div>
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  .voice-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    box-sizing: border-box;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .header-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #EFF6FF;
    border: 1.5px solid #BFDBFE;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .header-titles {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .title {
    font-size: 1rem;
    font-weight: 900;
    color: #0F172A;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .subtitle {
    font-size: 0.84rem;
    color: #475569;
    margin: 0;
  }

  /* Abas */
  .tabs-bar {
    display: flex;
    gap: 6px;
    background: #F1F5F9;
    padding: 4px;
    border-radius: 10px;
  }

  .tab-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 12px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: #64748B;
    font-size: 0.8rem;
    font-weight: 900;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .tab-btn.active {
    background: #FFFFFF;
    color: #2563EB;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  .tab-label-short {
    display: none;
  }

  /* Lista de Vozes */
  .voices-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 270px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .voice-item {
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 12px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.15s ease;
  }

  .voice-item:hover {
    border-color: #CBD5E1;
  }

  .voice-item.selected-row {
    background: #EFF6FF;
    border-color: #3B82F6;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
  }

  .avatar-wrap {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .avatar-wrap.device-avatar {
    background: #F1F5F9;
  }

  .avatar-emoji {
    font-size: 1.3rem;
    line-height: 1;
  }

  .info-wrap {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .name-line {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .voice-title {
    font-size: 0.94rem;
    font-weight: 900;
    color: #1E293B;
  }

  .active-badge {
    background: #16A34A;
    color: #FFFFFF;
    font-size: 0.68rem;
    font-weight: 900;
    padding: 2px 7px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    gap: 3px;
    letter-spacing: 0.5px;
  }

  .voice-desc {
    font-size: 0.78rem;
    color: #64748B;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Botões de Ação */
  .btn-group {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .listen-btn {
    background: #FFFFFF;
    border: 1.5px solid #CBD5E1;
    color: #334155;
    border-radius: 8px;
    padding: 6px 11px;
    font-size: 0.78rem;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: all 0.1s ease;
  }

  .listen-btn:hover {
    background: #F1F5F9;
    border-color: #94A3B8;
  }

  .listen-btn.is-playing {
    background: #DBEAFE;
    border-color: #3B82F6;
    color: #1D4ED8;
  }

  .use-btn {
    background: #2563EB;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    padding: 7px 12px;
    font-size: 0.78rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(37, 99, 235, 0.2);
    transition: background 0.1s ease;
  }

  .use-btn:hover {
    background: #1D4ED8;
  }

  .empty-state {
    padding: 16px;
    text-align: center;
    color: #64748B;
    font-size: 0.85rem;
    font-weight: 600;
  }

  @media (max-width: 640px) {
    .tab-label-full {
      display: none;
    }

    .tab-label-short {
      display: inline;
    }

    .voice-card {
      padding: 14px;
      gap: 12px;
    }

    .voice-item {
      display: grid;
      grid-template-columns: 38px 1fr;
      grid-template-rows: auto auto;
      gap: 8px 10px;
      align-items: center;
      padding: 10px;
    }

    .avatar-wrap {
      grid-column: 1;
      grid-row: 1;
    }

    .info-wrap {
      grid-column: 2;
      grid-row: 1;
      min-width: 0;
    }

    .btn-group {
      grid-column: 1 / -1;
      grid-row: 2;
      display: flex;
      width: 100%;
      gap: 6px;
    }

    .voice-title {
      font-size: 0.88rem;
    }

    .voice-desc {
      font-size: 0.72rem;
    }

    .listen-btn,
    .use-btn {
      flex: 1;
      justify-content: center;
      padding: 7px 10px;
      font-size: 0.76rem;
    }

    .tab-btn {
      font-size: 0.76rem;
      padding: 7px 6px;
    }
  }
</style>
