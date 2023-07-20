import type { Component } from 'solid-js';

import styles from './App.module.css';

import SplitX, { SCol } from './lib/SplitX';

const App: Component = () => {
  return (
    <div class={styles.App}>
      {/* <h1 class="text-3xl font-bold underline">Hello world!</h1> */}

      <SplitX>
        <SCol>
          <div class="w-full">Y1 X2 Y1</div>
        </SCol>

        <SCol>
          <div class="w-full">Y1 X2 Y2</div>
        </SCol>
        <SCol width={150}>
          <div class="w-full">
            hii
            {/* <SplitX>
              <SCol>
                <div class="w-full">Y1 X2 Y1</div>
              </SCol>
              <SCol>
                <div>Y1 X2 Y2</div>
              </SCol>
              <SCol width={300}>
                <div class="w-[100px]">Y1 X2 Y3</div>
              </SCol>
            </SplitX> */}
          </div>
        </SCol>
      </SplitX>
    </div>
  );
};

export default App;
