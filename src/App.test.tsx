import RequestSender from './api/utils/requestSender';


it('checks API is up', async () => {
  if (!await RequestSender.isApiAvailable()) {
    // Fail the test
    throw new Error('Backend API is not available. Make sure you correctly configured the URL and started it.');
  }
});
