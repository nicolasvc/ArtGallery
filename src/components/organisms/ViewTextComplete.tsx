import ViewDescription, { Props } from "../molecules/ViewDescription";
import CustomComponentWithGradient from "../molecules/ViewDescriptionContainer";



const ViewTextComplete: React.FC<Props> = ({ data }) => {
    return <CustomComponentWithGradient customComponent={<ViewDescription data={data} />} />
}

export default ViewTextComplete
