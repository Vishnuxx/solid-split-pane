import { For, createEffect, createSignal, onCleanup, onMount } from "solid-js";

type SplitYProps = {
  children: any;
  className: string;
};

function SplitY({ children, className }: SplitYProps) {
  const [index, setIndex] = createSignal(0);
  const [isDown, setIsDown] = createSignal(false);
  let mainref: Element;

  createEffect(() => {});

  onMount(() => {
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  });

  onCleanup(() => {});

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

    elem.style.height = bounds.height + "px";
    elem2.style.height = bounds2.height + "px";
    const sum = bounds.height + bounds2.height;
    const height1 = event.pageY - bounds.y;
    const height2 = sum - height1;
    console.log(sum, height1, height2);

    elem.style.height = height1 + "px";
    elem2.style.height = height2 + "px";
  };

  const handleUp = () => {
    setIsDown(false);
    console.log("ip");
  };

  return (
    <div ref={mainref} class="w-full h-full flex flex-col  bg-gray-300">
      {children.map((child: Element, index: number) => {
        console.log(100 / children.length);
        return (
          <>
            {index > 0 && (
              <div
                onPointerDown={handleDown}
                // onPointerUp={handleUp}
                class="w-full h-[5px] relative flex cursor-row-resize bg-gray-200 hover:bg-gray-500"
              ></div>
            )}
            <div class={``}>{child}</div>
          </>
        );
      })}
    </div>
  );
}

export default SplitY;
