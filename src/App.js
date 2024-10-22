import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, FloatingLabel, Form, Button, Alert } from 'react-bootstrap';

function App() {
  const [students, setStudents] = useState([
    { name: "Nguyen Van A", code: "CODE12345", isActive: true, selected: false },
    { name: "Tran Van B", code: "CODE67890", isActive: false, selected: false }
  ]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [newStudent, setNewStudent] = useState({ name: '', code: '', isActive: false });
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.code) {
      setErrorMessage('Please enter both Student Name and Student Code.');
      return;
    }
    setStudents([{ ...newStudent, selected: false }, ...students]);
    setNewStudent({ name: '', code: '', isActive: false });
    setErrorMessage('');
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
    updateSelectedCount(updatedStudents);
  };

  const handleSelectStudent = (index) => {
    const updatedStudents = students.map((student, i) =>
      i === index ? { ...student, selected: !student.selected } : student
    );
    setStudents(updatedStudents);
    updateSelectedCount(updatedStudents);
  };

  const updateSelectedCount = (updatedStudents) => {
    const count = updatedStudents.filter(student => student.selected).length;
    setSelectedCount(count);
  };

  const handleToggleStatus = (index) => {
    const updatedStudents = students.map((student, i) =>
      i === index ? { ...student, isActive: !student.isActive } : student
    );
    setStudents(updatedStudents);
  };

  const handleClearStudents = () => {
    setStudents([]);
    setSelectedCount(0);
  };

  return (
    <div className="app-container">
      <Container>
        <Row>
          <Col>
            <p className="pastel-yellow" style={{ fontSize: 30 }}>Total Selected Student: {selectedCount}</p>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleClearStudents}>Clear</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel controlId="floatingInput" label="Student Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Student Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingCode" label="Student Code">
              <Form.Control
                type="text"
                placeholder="Student Code"
                value={newStudent.code}
                onChange={(e) => setNewStudent({ ...newStudent, code: e.target.value })}
              />
            </FloatingLabel>
            <Form.Check
              type="checkbox"
              label="Still Active"
              checked={newStudent.isActive}
              onChange={(e) => setNewStudent({ ...newStudent, isActive: e.target.checked })}
            />
          </Col>
          <Col>
            <Button variant="primary" onClick={handleAddStudent}>Add</Button>
          </Col>
        </Row>

        {errorMessage && (
          <Row>
            <Col>
              <Alert variant="danger">{errorMessage}</Alert>
            </Col>
          </Row>
        )}

        <Row className="mt-4">
          <Col><strong className="pastel-yellow">Select</strong></Col>
          <Col><strong className="pastel-yellow">Student Name</strong></Col>
          <Col><strong className="pastel-yellow">Student Code</strong></Col>
          <Col><strong className="pastel-yellow">Status</strong></Col>
          <Col><strong className="pastel-yellow">Action</strong></Col>
        </Row>

        {students.map((student, index) => (
          <Row key={index} className="mb-3 student-list-row">
            <Col>
              <Form.Check
                type="checkbox"
                checked={student.selected}
                onChange={() => handleSelectStudent(index)}
              />
            </Col>
            <Col>{student.name}</Col>
            <Col>{student.code}</Col>
            <Col>
              <Button
                variant={student.isActive ? 'primary' : 'danger'}
                onClick={() => handleToggleStatus(index)}
              >
                {student.isActive ? 'Active' : 'Inactive'}
              </Button>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => handleDeleteStudent(index)}>Delete</Button>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}

export default App;
