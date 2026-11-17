<script lang="ts">
  interface Props {
    type: 'color_match' | 'shape_match'
    modelEmoji: string
    modelLabel: string
    modelColor?: string
  }

  const { type, modelEmoji, modelLabel, modelColor }: Props = $props()
</script>

<div class="model-stage">
  <div
    class="model-card {type === 'color_match' ? 'is-color-type' : 'is-shape-type'}"
    style={modelColor ? `--model-color: ${modelColor}` : ''}
  >
    <div class="model-badge">
      <span>MODELO DE REFERÊNCIA</span>
    </div>
    <div class="emoji-frame">
      <span class="giant-emoji">{modelEmoji}</span>
    </div>
    <span class="model-label">{modelLabel}</span>
  </div>

  <div class="guidance-banner">
    <span>ENCONTRE A OPÇÃO IGUAL AO MODELO ABAIXO</span>
  </div>
</div>

<style>
  .model-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(10px, min(2vw, 2.2dvh), 20px);
    width: 100%;
    max-width: 900px;
    padding-top: 16px;
    box-sizing: border-box;
  }

  .model-card {
    position: relative;
    background: #FFFFFF;
    border: 4px solid var(--model-color, #9333EA);
    border-radius: 28px;
    padding: clamp(16px, min(2.4vw, 2.6dvh), 26px) clamp(28px, 5vw, 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 8px 0 var(--model-color, #7E22CE), 0 12px 24px rgba(147, 51, 234, 0.16);
    transition: transform 0.2s ease;
    margin-bottom: 8px;
    max-width: 100%;
    box-sizing: border-box;
  }

  .model-card.is-shape-type {
    border-color: #3B82F6;
    box-shadow: 0 8px 0 #1D4ED8, 0 12px 24px rgba(37, 99, 235, 0.16);
  }

  .model-badge {
    position: absolute;
    top: -15px;
    background: #0F172A;
    color: #FFFFFF;
    font-size: clamp(0.68rem, 1.3vw, 0.85rem);
    font-weight: 900;
    letter-spacing: 0.8px;
    padding: 4px 14px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
  }

  .emoji-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    overflow: hidden;
  }

  .giant-emoji {
    font-size: clamp(3rem, min(10vw, 13.5dvh), 7.2rem);
    line-height: 1;
    filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.1));
    user-select: none;
    display: inline-block;
  }

  .model-label {
    font-size: clamp(1.05rem, min(2.2vw, 3dvh), 1.65rem);
    font-weight: 950;
    color: #1E293B;
    letter-spacing: 1px;
    text-align: center;
  }

  .guidance-banner {
    background: #F3E8FF;
    border: 2px dashed #C084FC;
    color: #7E22CE;
    padding: clamp(5px, 0.8dvh, 8px) clamp(12px, 2vw, 20px);
    border-radius: 14px;
    font-size: clamp(0.76rem, 1.5vw, 1rem);
    font-weight: 900;
    letter-spacing: 0.5px;
    text-align: center;
    max-width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 640px) {
    .model-stage {
      padding-top: 14px;
    }

    .model-card {
      padding: 14px 20px 10px;
      border-radius: 20px;
      border-width: 3px;
      box-shadow: 0 6px 0 var(--model-color, #7E22CE), 0 8px 16px rgba(147, 51, 234, 0.14);
    }

    .model-card.is-shape-type {
      box-shadow: 0 6px 0 #1D4ED8, 0 8px 16px rgba(37, 99, 235, 0.14);
    }

    .model-badge {
      top: -12px;
      font-size: 0.65rem;
      padding: 3px 10px;
    }

    .giant-emoji {
      font-size: clamp(2.6rem, 12vw, 4rem);
    }

    .model-label {
      font-size: 1rem;
    }

    .guidance-banner {
      padding: 5px 12px;
      font-size: 0.74rem;
    }
  }
</style>
