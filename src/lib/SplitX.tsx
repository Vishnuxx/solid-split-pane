import { For, createEffect, createSignal, onCleanup, onMount } from "solid-js";

type SplitXProps = {
  children: any;
  className: string;
};

function SplitX({ children, className }: SplitXProps) {
  const [index, setIndex] = createSignal(0);
  const [isDown, setIsDown] = createSignal(false);
  let mainref: Element;
  const staticWidths: Array<number | null> = [];
  let totalStaticWidths = 0;

  createEffect(() => {});

  onMount(() => {
    const b = mainref.getBoundingClientRect();
    const len = Array.from(mainref.children).length;
    for (let i = 0; i < len; i++) {
      const child = mainref.children[i];
      if (i > 0 && i % 2 != 0) {
        staticWidths[i] = null;
        continue;
      }
      if (child.style.width !== "100%") {
        staticWidths[i] = child.getBoundingClientRect().width;
        totalStaticWidths += staticWidths[i];
      } else {
        staticWidths[i] = null;
      }
    }

    for (let i = 0; i < len; i++) {
      console.log("dsd");
      const child = mainref.children[i];
      if (i > 0 && i % 2 != 0) continue;
      if (staticWidths[i] != null) {
        child.style.width = child.getBoundingClientRect().width + " px";
      } else {
        child.style.width = (b.width - totalStaticWidths) / (len - 2) + "px";
      }

      console.log(b, i, b.width / (len - 2) + "px");
    }
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  });

  onCleanup(() => {
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
  });

  const handleDown = (event: MouseEvent) => {
    const index = Array.from(mainref.children).indexOf(event.target);

    setIndex(index);
    setIsDown(true);
  };

  const handleMove = (event: MouseEvent) => {
    if (!isDown()) return;

    const elem = mainref.children[index() - 1];
    const elem2 = mainref.children[index() + 1];

    let bounds = elem.getBoundingClientRect();
    const bounds2 = elem2.getBoundingClientRect();

    const sum = bounds.width + bounds2.width;
    const width1 = event.pageX - bounds.x;
    const width2 = sum - width1;
    console.log(sum);
    const b = mainref.getBoundingClientRect();

    // if(width2 > staticWidths[index()+1] ) {
        elem.style.width = width1 + "px";
        elem2.style.width = width2 + "px";
    // }
    
  };

  const handleUp = () => {
    setIsDown(false);
    console.log("ip");
  };

  return (
    <div
      ref={mainref}
      class="w-full h-full flex flx-row overflow-auto bg-gray-300"
    >
      {children.map((child: Element, index: number) => {
        console.log(100 / children.length);
        return (
          <>
            {index > 0 && (
              <div
                onPointerDown={handleDown}
                // onPointerUp={handleUp}
                class="h-full w-[5px] flex cursor-col-resize bg-gray-200 hover:bg-gray-500"
              ></div>
            )}
            {child}
          </>
        );
      })}
    </div>
  );
}

export default SplitX;

type Props = {
  children: Array<Element>;
  width?: number;
};

export function SCol({ children, width }: Props) {
  console.log(width);
  return (
    <div
      style={{
        width: width ? width + "px" : "100%",
        display: "flex",
        flexFlow: "row",
      }}
    >
      {children}
    </div>
  );
}
