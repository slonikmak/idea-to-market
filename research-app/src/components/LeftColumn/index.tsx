import { IdeaInputSection } from './IdeaInputSection';
import { LLMPromptSection } from './LLMPromptSection';
import { MarkdownSection } from './MarkdownSection';

export function LeftColumn() {
  return (
    <>
      <IdeaInputSection />
      <LLMPromptSection />
      <MarkdownSection />
    </>
  );
}

export { IdeaInputSection } from './IdeaInputSection';
export { LLMPromptSection } from './LLMPromptSection';
export { MarkdownSection } from './MarkdownSection';
