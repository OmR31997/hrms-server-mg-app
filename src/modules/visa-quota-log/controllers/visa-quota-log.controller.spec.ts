import { Test, TestingModule } from '@nestjs/testing';
import { VisaQuotaLogController } from './visa-quota-log.controller';

describe('VisaQuotaLogController', () => {
  let controller: VisaQuotaLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisaQuotaLogController],
    }).compile();

    controller = module.get<VisaQuotaLogController>(VisaQuotaLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
