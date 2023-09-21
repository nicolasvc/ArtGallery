
import ViewContainerViewPager from "../molecules/ViewContainerVIewPager";
import ViewDescription, { Props } from "../molecules/ViewDescription";
import React from 'react';


const ViewDescriptionComplete: React.FC<Props> = ({ data }) => {
    return <ViewContainerViewPager customComponent={<ViewDescription data={data} />} />
}

export default ViewDescriptionComplete