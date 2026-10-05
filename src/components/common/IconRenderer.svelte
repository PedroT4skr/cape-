<script lang="ts">
  import {
    User,
    Users,
    Hand,
    Utensils,
    CupSoda,
    Droplet,
    Bath,
    Heart,
    LifeBuoy,
    Smile,
    CircleCheck,
    CircleX,
    Apple,
    Cookie,
    Croissant,
    ThumbsUp,
    Plus,
    OctagonX,
    Handshake,
    ArrowLeft,
    Frown,
    Bed,
    CircleAlert,
    Sun,
    Snowflake,
    Eye,
    Shield,
    Pill,
    Sparkles,
    MessageSquare,
    HelpCircle,
    GlassWater
  } from '@lucide/svelte'

  interface Props {
    emoji?: string
    iconName?: string
    iconUrl?: string
    iconSvg?: string
    size?: number
    className?: string
  }

  let { emoji, iconName, iconUrl, iconSvg, size = 32, className = '' }: Props = $props()

  // Mapeamento dinâmico de ícones Lucide
  const iconMap: Record<string, any> = {
    User,
    Users,
    Hand,
    Utensils,
    CupSoda,
    Droplet,
    Bath,
    Heart,
    LifeBuoy,
    Smile,
    CheckCircle2: CircleCheck,
    CircleCheck,
    XCircle: CircleX,
    CircleX,
    Apple,
    Cookie,
    Croissant,
    ThumbsUp,
    Plus,
    OctagonX,
    HeartHandshake: Handshake,
    Handshake,
    ArrowLeft,
    Frown,
    Angry: Frown,
    Bed,
    AlertTriangle: CircleAlert,
    CircleAlert,
    Sun,
    Snowflake,
    Eye,
    Shield,
    Pill,
    Sparkles,
    MessageSquare,
    GlassWater
  }

  let ResolvedIcon = $derived(iconName && iconMap[iconName] ? iconMap[iconName] : null)
</script>

<div class="icon-renderer-container {className}" style="width: {size}px; height: {size}px;">
  {#if emoji}
    <span class="emoji-symbol" style="font-size: {Math.round(size * 0.88)}px; line-height: 1;">
      {emoji}
    </span>
  {:else if iconUrl}
    <img src={iconUrl} alt="Pictograma" class="icon-image" loading="lazy" />
  {:else if iconSvg}
    <div class="icon-svg-wrapper">{@html iconSvg}</div>
  {:else if ResolvedIcon}
    <ResolvedIcon size={size} strokeWidth={2.2} />
  {:else}
    <MessageSquare size={size} strokeWidth={2} />
  {/if}
</div>

<style>
  .icon-renderer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    pointer-events: none;
  }

  .emoji-symbol {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }

  .icon-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
  }

  .icon-svg-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
