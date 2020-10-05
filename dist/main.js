'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var serverRenderer = require('@vue/server-renderer');

var script = {
  props: {
    foo: String,
    bar: Boolean,
    nope: null,
    lots: {
      required: true,
      type: Number
    }
  }
};

function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<h1${serverRenderer.ssrRenderAttrs(_attrs)}>sup</h1>`);
}

script.ssrRender = ssrRender;
script.__file = "App.vue";

exports.App = script;
