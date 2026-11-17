<script lang="ts">
  import type { ActivityQuestion } from '../../types/activity.types'
  import CountStage from './dyscalculia/CountStage.svelte'
  import DualGroupStage from './dyscalculia/DualGroupStage.svelte'
  import LiteracyQuestionView from './LiteracyQuestionView.svelte'
  import VisualPerceptionQuestionView from './VisualPerceptionQuestionView.svelte'

  interface Props {
    question: ActivityQuestion
  }

  const { question }: Props = $props()
</script>

<div class="question-view">
  {#if question.type === 'count' && question.items}
    <CountStage items={question.items} />
  {:else if question.type === 'addition' && question.groupA && question.groupB}
    <DualGroupStage
      leftGroup={question.groupA}
      rightGroup={question.groupB}
      centerBadge="➕"
      variant="addition"
    />
  {:else if question.type === 'comparison' && question.optionLeft && question.optionRight}
    <DualGroupStage
      leftGroup={question.optionLeft}
      rightGroup={question.optionRight}
      centerBadge="VS"
      variant="comparison"
    />
  {:else if question.type === 'initial_letter' || question.type === 'syllables' || question.type === 'word_match'}
    <LiteracyQuestionView {question} />
  {:else if question.type === 'color_match' || question.type === 'shape_match' || question.type === 'routine_sequence'}
    <VisualPerceptionQuestionView {question} />
  {/if}
</div>

<style>
  .question-view {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: auto;
    flex-shrink: 0;
    padding: 6px 8px;
    box-sizing: border-box;
  }

  @media (max-width: 640px) {
    .question-view {
      padding: 4px 2px;
    }
  }
</style>
