import React, {useState, useEffect} from "react"; 
import axios from "axios";
import { withFormik, Form, Field}  from "formik";
import * as Yup from "yup";



const MyForm = ({ values, touched, errors, status}) => {
    const [user, setUser] = useState ([]);

    useEffect(() => {
        status && setUser(user => [...user, status]);
    }, [status]);//ends UseEffect
        
    return (
        <div className="form-main">
            <Form>
                <div>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name &&(
                    <p className="errors">{errors.name}</p>
                )}
                </div>
                <div>
                <Field type="email" name="email" placeholder="email@domain.net" />
                {touched.email && errors.email &&(
                    <p className="errors">{errors.email}</p>
                )}
                </div>
                <div>
                <Field type="password" name="password" />
                {touched.password && errors.password &&(
                    <p className="errors">{errors.password}</p>
                )}
                </div>
                <div>
                <label className="checkbox">
                    I agree to all Terms and Conditions
                <Field type="checkbox" name="terms" checked={values.terms}/>
                </label>
                </div>
                <button type="submit">Submit</button>
            </Form>
            {user.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
};//ends MyForm

const FormikMyForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },//ends map
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter first, last name"),
        email: Yup.string().required("Valid email required"),
        password: Yup.string().required("Password not valid"),
        terms: Yup.boolean().oneOf([true]).required("Must accept terms to continue")
    }),
    handleSubmit(values, {setStatus}) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
                setStatus(response.data);
                console.log(response);
            })
            .catch(err => console.log (err.response));
    }
})(MyForm);//ends FormikMyForm


export default FormikMyForm;