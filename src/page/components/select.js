import { Select } from 'antd';

const { Option } = Select;

const SelectComp = (props) => {
    let data = props.data || []
    let OptionItem = ''

    const onChange = (value) => {
        props.onChangeHandle(props.name, value)
    }

    if (props.name && props.name === 'country') {

        OptionItem = data.map((item, i) => {
            return <Option key={i} value={item.name}><div><img alt={item.name} src={item.flag} height="30px" width="30px" />&nbsp;{item.name} </div></Option>
        })
    } else {
        OptionItem = data.map((item, i) => {
            return <Option key={i} value={item}>{item}</Option>
        })
    }
    return (
        <Select
            showSearch
            placeholder="N/A"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {OptionItem}
        </Select>
    )
}

export default SelectComp