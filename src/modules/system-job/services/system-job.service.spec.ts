import { Test, TestingModule } from '@nestjs/testing';
import { SystemJobService } from './system-job.service';

describe('SystemJobService', () => {
  let service: SystemJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemJobService],
    }).compile();

    service = module.get<SystemJobService>(SystemJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
