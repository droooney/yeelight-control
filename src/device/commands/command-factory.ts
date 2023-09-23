import { Device } from '../device';
import {
  BrightInput,
  CommandInput,
  DefaultInput,
  HsvInput,
  PowerInput,
  RgbInput,
  StartFlowInput,
  StopFlowInput,
  TemperatureInput,
  ToggleInput,
} from '../dto/command-input';
import { Feature } from '../enums/feature';
import { Command } from './command';
import { BrightCommand } from './implementations/bright.command';
import { DefaultCommand } from './implementations/default.command';
import { HsvCommand } from './implementations/hsv.command';
import { PowerCommand } from './implementations/power.command';
import { RgbCommand } from './implementations/rgb.command';
import { StartFlowCommand } from './implementations/start-flow.command';
import { StopFlowCommand } from './implementations/stop-flow.command';
import { TemperatureCommand } from './implementations/temperature.command';
import { ToggleCommand } from './implementations/toggle.command';

export class CommandFactory {
  constructor(private readonly device: Device) {}

  get(input: CommandInput): Command {
    if (this.isTemperature(input))
      return new TemperatureCommand(this.device, input);
    if (this.isRgb(input)) return new RgbCommand(this.device, input);
    if (this.isHsv(input)) return new HsvCommand(this.device, input);
    if (this.isBright(input)) return new BrightCommand(this.device, input);
    if (this.isPower(input)) return new PowerCommand(this.device, input);
    if (this.isToggle(input)) return new ToggleCommand(this.device, input);
    if (this.isDefault(input)) return new DefaultCommand(this.device, input);
    if (this.isStartFlow(input))
      return new StartFlowCommand(this.device, input);
    if (this.isStopFlow(input)) return new StopFlowCommand(this.device, input);

    throw new Error(`Feature ${input.feature} not implemented`);
  }

  private isTemperature(input: CommandInput): input is TemperatureInput {
    return (
      input.feature === Feature.set_ct_abx ||
      input.feature === Feature.bg_set_ct_abx
    );
  }

  private isRgb(input: CommandInput): input is RgbInput {
    return (
      input.feature === Feature.set_rgb || input.feature === Feature.bg_set_rgb
    );
  }

  private isHsv(input: CommandInput): input is HsvInput {
    return (
      input.feature === Feature.set_hsv || input.feature === Feature.bg_set_hsv
    );
  }

  private isBright(input: CommandInput): input is BrightInput {
    return (
      input.feature === Feature.set_bright ||
      input.feature === Feature.bg_set_bright
    );
  }

  private isPower(input: CommandInput): input is PowerInput {
    return (
      input.feature === Feature.set_power ||
      input.feature === Feature.bg_set_power
    );
  }

  private isToggle(input: CommandInput): input is ToggleInput {
    return (
      input.feature === Feature.toggle ||
      input.feature === Feature.bg_toggle ||
      input.feature === Feature.dev_toggle
    );
  }

  private isDefault(input: CommandInput): input is DefaultInput {
    return (
      input.feature === Feature.set_default ||
      input.feature === Feature.bg_set_default
    );
  }

  private isStartFlow(input: CommandInput): input is StartFlowInput {
    return (
      input.feature === Feature.start_cf ||
      input.feature === Feature.bg_start_cf
    );
  }

  private isStopFlow(input: CommandInput): input is StopFlowInput {
    return (
      input.feature === Feature.stop_cf || input.feature === Feature.bg_stop_cf
    );
  }
}
