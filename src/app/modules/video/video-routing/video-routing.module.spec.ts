import { VideoRoutingModule } from './video-routing.module';

describe('VideoRoutingModule', () => {
  let videoRoutingModule: VideoRoutingModule;

  beforeEach(() => {
    videoRoutingModule = new VideoRoutingModule();
  });

  it('should create an instance', () => {
    expect(videoRoutingModule).toBeTruthy();
  });
});
