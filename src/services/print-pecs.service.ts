import type { Board, Cell } from '../types/board.types'
import { FITZGERALD_COLORS } from '../constants/fitzgerald.constants'

/**
 * Gera um documento de impressão A4 estritamente formatado com cartões PECS recortáveis
 * e linhas pontilhadas guias de corte.
 */
export function printBoardAsPecs(board: Board, cells: Cell[]): void {
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Por favor, permita pop-ups para imprimir os cartões da prancha.')
    return
  }

  const sortedCells = [...cells].sort((a, b) => a.position - b.position)

  const cardsHtml = sortedCells
    .map((cell) => {
      const colors = FITZGERALD_COLORS[cell.category] || FITZGERALD_COLORS.MISC
      
      let visualContent = ''
      if (cell.iconType === 'emoji') {
        visualContent = `<div class="card-emoji">${cell.iconValue}</div>`
      } else if (cell.imageUrl) {
        visualContent = `<img class="card-image" src="${cell.imageUrl}" alt="${cell.label}" />`
      } else {
        visualContent = `<div class="card-emoji">💬</div>`
      }

      return `
        <div class="pecs-card" style="border-color: ${colors.border}; background-color: ${colors.bg};">
          <div class="card-visual">${visualContent}</div>
          <div class="card-label" style="color: ${colors.text};">${cell.label.toUpperCase()}</div>
        </div>
      `
    })
    .join('')

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <title>Imprimir Prancha PECS - ${board.name}</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 1.2cm;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        }
        body {
          background: #fff;
          color: #000;
          padding: 0;
        }
        .header {
          text-align: center;
          margin-bottom: 16px;
          border-bottom: 2px solid #000;
          padding-bottom: 8px;
        }
        .header h1 {
          font-size: 16pt;
          font-weight: bold;
          text-transform: uppercase;
        }
        .header p {
          font-size: 9pt;
          color: #555;
          margin-top: 2px;
        }
        .grid-pecs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .pecs-card {
          width: 100%;
          aspect-ratio: 1 / 1.15;
          border: 3.5px solid #000;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
          page-break-inside: avoid;
          position: relative;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        /* Guia pontilhada de corte externo */
        .pecs-card::after {
          content: '';
          position: absolute;
          top: -6px;
          bottom: -6px;
          left: -6px;
          right: -6px;
          border: 1px dashed #999;
          border-radius: 14px;
          pointer-events: none;
        }
        .card-visual {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          overflow: hidden;
        }
        .card-emoji {
          font-size: 44pt;
          line-height: 1;
        }
        .card-image {
          max-width: 90%;
          max-height: 80px;
          object-fit: contain;
        }
        .card-label {
          font-size: 10pt;
          font-weight: 800;
          text-align: center;
          margin-top: 4px;
          letter-spacing: 0.5px;
          background: rgba(255, 255, 255, 0.85);
          width: 100%;
          padding: 2px 4px;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>CAPE — Prancha de Comunicação PECS: ${board.name}</h1>
        <p>Centro de Apoio Pedagógico Especializado • Cartões com Código Morfossintático da Chave de Fitzgerald</p>
      </div>
      <div class="grid-pecs">
        ${cardsHtml}
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `

  printWindow.document.open()
  printWindow.document.write(html)
  printWindow.document.close()
}

