(async () => {
  const CoreIcons = await import("@hugeicons/core-free-icons");
  console.log("typeof AbacusIcon:", typeof CoreIcons.AbacusIcon);
  if (typeof CoreIcons.AbacusIcon === 'function') {
      console.log("toString:", CoreIcons.AbacusIcon.toString().slice(0, 100));
  } else {
      console.log("value:", CoreIcons.AbacusIcon);
  }
})();
