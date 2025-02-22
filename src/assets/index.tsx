import React from 'react';

import Icon from '../components/Icons';
const LoginBackImg = require('assets/images/back2.jpg');
const TRURealtyLogo = require('assets/images/logo.png');
const TRURealtyBlackLogo = require('assets/images/truRealty.png');
const PersonImg = require('assets/images/person.jpg');

const Wrong = React.memo(() => <Icon type='Ionicons' name="ios-close-circle-outline" />);

const Correct = React.memo(() => (
  <Icon type='Ionicons' name="ios-checkmark-circle-outline" />
));

export {
  Wrong,
  Correct,
  LoginBackImg,
  TRURealtyLogo,
  PersonImg,
  TRURealtyBlackLogo,
  Icon,
};
