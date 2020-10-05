'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var serverRenderer = require('@vue/server-renderer');

var script = {
  props: {
    foo: String,
    bar: Boolean,
    nope: null,
    prom: Promise,
    several: [String, Number],
    lots: {
      required: true,
      type: Number,
      default: 42
    }
  }
};

function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<h1${serverRenderer.ssrRenderAttrs(_attrs)}>sup</h1>`);
}

script.ssrRender = ssrRender;
script.__file = "App.vue";

exports.App = script;
