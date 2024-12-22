import { ContentState, ContentBlock, CompositeDecorator, DefaultDraftBlockRenderMap } from "draft-js";
import { FC } from "react";
import { Link } from "react-router-dom";

type ComponentsT = {
  children?: React.ReactNode;
  contentState: ContentState;
  entityKey: string;
}

const LinkComponent: FC<ComponentsT> = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <Link to={url} target='_blank' style={{color: '#357EEB'}} >
      {children}
    </Link>
  );
}

const findLinkEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
): void => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}

export const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: LinkComponent,
  },
]);

import { Map } from "immutable";

export const mapWithButton = Map({
  hr: {
    element: "hr"
  }
}).merge(DefaultDraftBlockRenderMap);


