import { TestWindow } from '@stencil/core/testing';
import { AppToolbar } from './app-toolbar';

describe('app-toolbar', () => {
  it('should build', () => {
    expect(new AppToolbar()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppToolbarElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AppToolbar],
        html: '<app-toolbar></app-toolbar>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
