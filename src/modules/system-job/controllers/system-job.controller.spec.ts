import { Test, TestingModule } from '@nestjs/testing';
import { SystemJobController } from './system-job.controller';

describe('SystemJobController', () => {
  let controller: SystemJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemJobController],
    }).compile();

    controller = module.get<SystemJobController>(SystemJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
