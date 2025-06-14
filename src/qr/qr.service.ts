import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrService {
  async generateQrCode(url: string): Promise<string> {
    return await QRCode.toDataURL(url);
  }
}
