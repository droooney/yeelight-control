import { Device } from '../../device';
import { DefaultInput } from '../../dto/command-input';
import { BaseCommand, CommandData } from '../command';

export class DefaultCommand extends BaseCommand {
  constructor(device: Device, { feature }: DefaultInput) {
    super(device, feature);
  }

  get data(): CommandData {
    return {
      id: this._id,
      method: this._feature,
      params: [],
    };
  }

  protected feedback(): void {
    return;
  }
}
