'use strict';

const kafkajs = jest.genMockFromModule('kafkajs');

class Producer {

  async connect() {
    return Promise.resolve();
  }

  async send({ topic, messages }) {
   console.log('Sending message');
  }

  async disconnect() {
    return Promise.resolve();
  }
}

kafkajs.Kafka = class Kafka {
  constructor(config) {
    this.brokers = config.brokers;
    this.clientId = config.clientId;
    this.topics = {};
  }


  producer() {
    return new Producer();
  }
};

module.exports = kafkajs;