Please add any additional notes here…

Set TypeScript to strict mode to help highlight runtime errors.

Implemented steps to reset the test data to a known snapshot before each tests. This ensures the test data is consistent after making POST and DELETE requests.

Made changes to test script to remove the --watch flag as it was interferring with the reset during beforeEach and afterEach callbacks.