import React from 'react';
import Atom from '../components/atom';
import Head from 'next/head';

export default () => (
  <div>
    <Head>
      <title>react-web-animation: Next.js</title>
      <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,700' rel='stylesheet' type='text/css'/>
      <style>
        {
          `body {
        font-family: Roboto, Helvetica, Arial, Sans-Serif;
        font-size: 16px;
        font-weight: 300;
        overflow-y: hidden;
        margin: 0;
        padding: 0;
      }

        button {
        padding: 4px;
        margin: 2px;
        background: #fff;
        outline: none;
        border: 1px solid #ddd;
        height: 25px;
        border-radius: 3px;
        line-height: 16px;
      }`
        }
      </style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.2.1/web-animations-next.min.js"></script>
    </Head>
    <Atom/>
  </div>
)
