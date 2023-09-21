import ViewContainerViewPager, { HandlerEvents } from "../molecules/ViewContainerVIewPager"
import { ItemDescription } from "../molecules/ViewDescription"
import ViewTextComplete from "../organisms/ViewTextComplete"


export interface PropsTemplate {
    infoText: ItemDescription;
    handleEvent?: HandlerEvents
}


const TemplateArtText: React.FC<PropsTemplate> = ({ infoText, handleEvent }) => {
    return <ViewContainerViewPager events={handleEvent} customComponent={<ViewTextComplete data={infoText} />} />
}

export default TemplateArtText