import { Resume } from '../resume/resume';

export interface TemplateOptions {
  name: string;
  title: string;
  template: React.FC<{ resume: Resume }>
}

export const templateRegistry = new (class TemplateRegistry {
  private templates: TemplateOptions[] = [];

  register(template: TemplateOptions) {
    this.templates.push(template);
  }

  getTemplates() {
    return this.templates;
  }

  getTemplateByName(name: string) {
    const options = this.templates.find(item => item.name === name);
    if (options) {
      return options.template;
    }
    return null;
  }
})();

export function registerTemplate(template: TemplateOptions) {
  templateRegistry.register(template);
}