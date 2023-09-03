import { LocalNetwork } from './utils/local-network';
import { ValueParser } from './utils/value-parser';

export type ConfigParams = {
  /** Multicast port. Defaults to 1982 */
  discoveryPort: number;
  /** Multicast address. Defaults to 239.255.255.250 */
  discoveryIp: string;
  /** Local machine IP. Defaults to first found interface */
  discoveryHost: string;
  /** Reconnect timeout in ms */
  socketReconnect: number;
};

export class Config {
  private _state: ConfigParams;

  constructor(params?: Partial<ConfigParams>) {
    if (!params) {
      this._state = {
        ...defaults,
        discoveryHost: this.getLocalhost(),
      };
      return;
    }

    this._state = {
      discoveryPort: this.getPort(params),
      discoveryIp: this.getAddress(params),
      discoveryHost: this.getHost(params),
      socketReconnect: this.getReconnect(params),
    };
  }

  get discoveryPort(): number {
    return this._state.discoveryPort;
  }
  get discoveryIp(): string {
    return this._state.discoveryIp;
  }
  get discoveryHost(): string {
    return this._state.discoveryHost;
  }
  get socketReconnect(): number {
    return this._state.socketReconnect;
  }

  private getPort({ discoveryPort: port }: Partial<ConfigParams>): number {
    if (port == null) return defaults.discoveryPort;
    return ValueParser.port(port);
  }

  private getAddress({ discoveryIp: ip }: Partial<ConfigParams>): string {
    if (ip == null) return defaults.discoveryIp;
    return ValueParser.ip(ip);
  }

  private getHost({ discoveryHost: ip }: Partial<ConfigParams>): string {
    if (ip == null) return this.getLocalhost();
    return ValueParser.ip(ip);
  }

  private getLocalhost(): string {
    const localhost = LocalNetwork.getLocalIp();
    return localhost || defaults.discoveryHost;
  }

  private getReconnect({ socketReconnect }: Partial<ConfigParams>): number {
    if (socketReconnect == null) return defaults.socketReconnect;
    if (typeof socketReconnect === 'number' && socketReconnect >= 0)
      return socketReconnect;
    throw new Error(`Invalid reconnect interval: ${socketReconnect}`);
  }
}

const defaults: ConfigParams = {
  discoveryPort: 1982,
  discoveryIp: '239.255.255.250',
  discoveryHost: '0.0.0.0',
  socketReconnect: 5000,
};
