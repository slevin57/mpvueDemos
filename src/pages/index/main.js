import Vue from 'vue';
import App from './index';

const app = new Vue(App);
app.$mount();

// test
function fnd() {
    console.warn(`2:`, 2);
}
fnd();
