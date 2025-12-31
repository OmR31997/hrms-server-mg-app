import { Test, TestingModule } from '@nestjs/testing';
import { VisaHistoryController } from './visa-history.controller';

describe('VisaHistoryController', () => {
  let controller: VisaHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisaHistoryController],
    }).compile();

    controller = module.get<VisaHistoryController>(VisaHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
