import { FileValidationPipe } from "./image-upload.pipe";


describe('ImageUploadPipe', () => {
  it('should be defined', () => {
    expect(new FileValidationPipe()).toBeDefined();
  });
});