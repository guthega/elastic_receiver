# @guthega/elastic_receiver

[![NPM version](https://img.shields.io/npm/v/@guthega/elastic_receiver.svg)](https://www.npmjs.org/package/@guthega/elastic_receiver)
[![Build Status](https://travis-ci.org/guthega/elastic_receiver.svg?branch=master)](https://travis-ci.org/guthega/elastic_receiver)

Elasticsearch receiver module for Guthega.

This module routes the inbound message to a configured Elasticsearch index.

## Usage

Refer to documentation in the [Guthega repo](https://github.com/guthega) for notes on how to use this receiver module.

## Configuration

This module makes use of the official Elasticsearch Client for Javascript. Please refer to the [client connection options](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html#config-options) for information on which entries under `properties` are available and should be set.
