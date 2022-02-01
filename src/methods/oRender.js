export function oRender(parentNode, childNode, cleanParentContent = false) {
  if (Array.isArray(childNode)) {
    childNode.forEach(child => oRender(parentNode, child));
    return;
  }

  const isParentNodeValid = (parentNode instanceof HTMLElement) || parentNode._isoelement;
  const isChildNodeValid = (childNode instanceof HTMLElement) || !!childNode.__proto__.init;
  if (!isParentNodeValid || !isChildNodeValid)
    return;

  let parentNodeHTML = (parentNode instanceof HTMLElement) ? parentNode : parentNode.element;
  const renderNode = (childNode, dontClean = false) => {
    if (childNode instanceof HTMLElement) {
      if (cleanParentContent && !dontClean) parentNodeHTML.innerHTML = '';
      parentNodeHTML.appendChild(childNode);
      return;
    }
    if (childNode.__proto__.init) {
      if (cleanParentContent && !dontClean) parentNodeHTML.innerHTML = '';
      parentNodeHTML.appendChild(childNode.init());
    }
  }

  if (childNode._isofragment) {
    childNode.init().forEach((child, childIndex) => renderNode(child, !childIndex));
    return;
  }

  renderNode(childNode);
}
