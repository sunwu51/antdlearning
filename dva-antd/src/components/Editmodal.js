import { Modal, Button,Input,Form,Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class App extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
    const { name,age,address} = this.props.record;
    this.props.form.setFieldsValue({name:name,age: age,address:address})
  }
  handleOk = (e) => { 
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { record } = this.props;
        onOk(Object.assign(values,{key: record.key}));
        this.setState({
            visible: false,
        });
      }
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
    // this.props.onCancel();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { name,age,address} = this.props.record;
    return (
      <span>
        <span onClick={this.showModal}>
            {this.props.children}
        </span>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
            <Form onSubmit={this.handleOk}>
                <FormItem
                  label="Name"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 12 }}
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入姓名' }],
                    initialValue: name
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  label="Age"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 12 }}
                >
                  {getFieldDecorator('age', {
                    rules: [{ required: true, message: '请输入年龄' }],
                    initialValue: age
                  })(
                    <Select
                      placeholder="选择一个年龄"
                    >
                      <Option value="32">32</Option>
                      <Option value="42">42</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  label="Address"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 12 }}
                >
                  {getFieldDecorator('address', {
                    rules: [{ required: true, message: '请输入地址' }],
                    initialValue: address
                  })(
                    <Input/>
                  )}
                </FormItem>
              
            </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(App);   