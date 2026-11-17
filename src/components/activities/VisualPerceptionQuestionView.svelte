<script lang="ts">
  import type { ActivityQuestion } from '../../types/activity.types'
  import ModelMatchStage from './visual/ModelMatchStage.svelte'
  import RoutineSequenceStage from './visual/RoutineSequenceStage.svelte'

  interface Props {
    question: ActivityQuestion
  }

  const { question }: Props = $props()
</script>

<div class="visual-question-view">
  {#if (question.type === 'color_match' || question.type === 'shape_match') && question.visualTarget}
    <ModelMatchStage
      type={question.type}
      modelEmoji={question.visualTarget.modelEmoji}
      modelLabel={question.visualTarget.modelLabel}
      modelColor={question.visualTarget.modelColor}
    />
  {:else if question.type === 'routine_sequence' && question.visualTarget?.sequenceSteps}
    <RoutineSequenceStage sequenceSteps={question.visualTarget.sequenceSteps} />
  {/if}
</div>

<style>
  .visual-question-view {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 4px 6px;
    box-sizing: border-box;
  }
</style>
