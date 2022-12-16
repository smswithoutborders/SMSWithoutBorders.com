# Testing

We build for people. Physically testing each feature to make sure it works is best. Some parts of the project depend on others or are inter-linked. We encourage developers to test these groups as a whole if any one of them is changed.

## Storing accounts

We can store Gmail, twitter and telegram tokens currently. Gmail and twitter share the same authorization flow. If an update is made to any one of them then the other(s) need to be tested to make sure everything works as it should.
