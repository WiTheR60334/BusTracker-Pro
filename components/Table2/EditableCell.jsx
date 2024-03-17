// EditableCell.jsx
"use client"
import React, { useState } from 'react';
import { Input, Icon } from 'antd';
import styles from './Table2.module.css';

const EditableCell = ({ value, onChange }) => {
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const check = () => {
    setEditable(false);
    if (onChange) {
      onChange(inputValue);
    }
  };

  const edit = () => {
    setEditable(true);
  };

  return (
    <div className={styles.editableCell}>
      {editable ? (
        <div className={styles.editableCellInputWrapper}>
          <Input
            value={inputValue}
            onChange={handleChange}
            onPressEnter={check}
          />
          <Icon
            type="check"
            className={styles.editableCellIconCheck}
            onClick={check}
          />
        </div>
      ) : (
        <div className={styles.editableCellTextWrapper} onClick={edit}>
          {value || ' '}
          <Icon type="edit" className={styles.editableCellIcon} />
        </div>
      )}
    </div>
  );
};

export default EditableCell;