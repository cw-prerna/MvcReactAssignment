import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Rating from '../component/Rating';

configure({ adapter: new Adapter() });

describe('Rating Component', () => {
    it('Stars rendered Correctly', () => {
        let wrapper = shallow(<Rating RatingValue={1} />);
        expect(wrapper.find("#star").length).toBe(1);
    });
    it('Rendered Correctly', () => {
        let wrapper = shallow(<Rating RatingValue={1} />);
        expect(wrapper.find("#nv").length).toBe(4);
    });
});