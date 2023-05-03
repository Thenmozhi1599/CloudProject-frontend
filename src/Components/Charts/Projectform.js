// import React, { useState } from "react";
// import axios, { all } from "axios";

// export default function ProjectForm() {
//   const [allValues, setAllValues] = useState({});

//   const changeHandler = (e) => {
//     setAllValues((prevValues) => {
//       return { ...prevValues, [e.target.name]: e.target.value };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("", allValues)
//       .then((d) => {
//         console.log(d.data);
//       })
//       .catch((err) => {
//         console.log("err");
//       });
//   };

//   return (
//     <form>
//       <h3>Projects-Description</h3>

//       <div className="mb-3">
//         <label>
//           <h5>Project name :</h5>
//         </label>
//         <input
//           type="text"
//           id="projectname"
//           name="projectname"
//           className="form-control"
//           placeholder="eg: Project-1"
//           onChange={changeHandler}
//           value={allValues.projectname}
//         />
//       </div>

//       <div className="mb-3">
//         <label>Project-ID</label>
//         <input
//           type="text"
//           id="Project-id"
//           name="Project-id"
//           className="form-control"
//           placeholder="eg: 1234-5678-1234"
//           onChange={changeHandler}
//           value={allValues.projectid}
//         />
//       </div>

//       <select className="cloud-provider" onChange={changeHandler}>
//         <option value="aws">AWS</option>
//         <option value="gcp">GCP</option>
//         <option value="azure">Azure</option>
//       </select>

//       <div className="d-grid">
//         <button
//           type="submit"
//           className="btn btn-primary"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// }
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { useState } from 'react';

function ProjectForm(){
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      {/* <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item> */}
      <Form.Item label="Project Name">
        <Input />
      </Form.Item>
      <Form.Item label="Resource Id">
        <Input />
      </Form.Item>
      <Form.Item label="CSP">
      <Select>
          <Select.Option value="CSP">AWS</Select.Option>
          <Select.Option value="CSP">Azure</Select.Option>
          <Select.Option value="CSP">Google cloud</Select.Option>
        </Select>
      </Form.Item>
      {/* <Form.Item label="">
        <Cascader
          options={[
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                },
              ],
            },
          ]}
        />
      </Form.Item> */}
      {/* <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item> */}
      {/* <Form.Item label="InputNumber">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Switch" valuePropName="checked">
        <Switch />
      </Form.Item> */}
      <Form.Item label="Button">
        <Button>Button</Button>
      </Form.Item>
    </Form>
  );
};
export default ProjectForm;
