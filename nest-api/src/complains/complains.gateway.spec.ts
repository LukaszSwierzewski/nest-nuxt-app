import { Test, TestingModule } from '@nestjs/testing';
import { ComplainsGateway } from './complains.gateway';

describe('ComplainsGateway', () => {
  let gateway: ComplainsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplainsGateway],
    }).compile();

    gateway = module.get<ComplainsGateway>(ComplainsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
