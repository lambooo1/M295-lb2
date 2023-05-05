## Testfälle 
### GET /tasks


**Testfall:** Tasks aufrufen, während Nutzer authentifiziert ist. 

**Bedingung**
- authentifiziert 

**Erwartetes Ergebnis:**
- Status-Code `200 OK`.
- Liste Tasks

</br>

**Testfall:** Tasks aufrufen, während Nutzer nicht authentifiziert ist. 

**Bedingung**
- nicht authentifiziert

**Erwartetes Ergebnis:**
- Status-Code `403 Forbidden`.
- JSON-Fehlermeldung

</br>

### GET /task/{id}

**Testfall:** eine Task aufrufen, während Nutzer nicht authentifiziert ist. 

**Bedingung**
- nicht authentifiziert

**Erwartetes Ergebnis:**
- Status-Code `403 Forbidden`.
- JSON-Fehlermeldung

</br>

**Testfall:** eine Task aufrufen, während Nutzer authentifiziert ist. 

**Bedingung**
- authentifiziert

**Erwartetes Ergebnis:**
- Status-Code `200 OK`.
- Task mit der id

</br>

