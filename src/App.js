import './App.css';
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import newCustomer from './pages/newCustomer/newCustomer.js';
import newOffreCustomer from './pages/customer/newOffreCustomer.js';
import oldOfferCustomer from './pages/customer/oldOfferCustomer.js';

// Structure des questions avec embranchements selon la réponse
const questions = {
  start: {
    name: "start",
    label: "Type de contrat ?",
    options: [
      { label: "Nouveau client", value: "newCustomer", next: "newCustomer" },
      { label: "Déja client nouvelle offre", value: "newOffreCustomer", next: "newOffreCustomer" },
      { label: "Déja client ancienne offre", value: "oldOfferCustomer", next: "oldOfferCustomer" },
    ]
  },
  // NOUVEAU CLIENT
  ...newCustomer,
  // DEJA CLIENT
  ...newOffreCustomer,
  ...oldOfferCustomer,
  // Fin du questionnaire
};

function App() {
  const { register, handleSubmit, setValue, getValues, watch } = useForm();
  const [history, setHistory] = useState(["start"]); // Historique des étapes
  const [currentKey, setCurrentKey] = useState("start");
  const [showResult, setShowResult] = useState(false);
  const [checkboxResult, setCheckboxResult] = useState(null);
  const [checkboxValidated, setCheckboxValidated] = useState(false);

  const currentQuestion = questions[currentKey];

  // Pour revenir en arrière et réinitialiser la sélection de l'écran précédent
  const prevStep = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      const prevKey = newHistory[newHistory.length - 2]; // clé de l'écran précédent
      newHistory.pop();
      setHistory(newHistory);
      setCurrentKey(newHistory[newHistory.length - 1]);
      setCheckboxResult(null);
      setCheckboxValidated(false);
      // Réinitialise la sélection de l'écran précédent
      if (questions[prevKey]?.type === "checkbox") {
        setValue(questions[prevKey].name, []);
      } else if (questions[prevKey]?.type === "radio") {
        setValue(questions[prevKey].name, "");
      }
    }
  };

  // Pour avancer selon la réponse choisie
  const nextStep = (optionValue) => {
    const option = currentQuestion.options.find(
      (opt) => opt.value === optionValue
    );
    if (option && option.next) {
      setHistory([...history, option.next]);
      setCurrentKey(option.next);
      setCheckboxResult(null);
      setCheckboxValidated(false);
    }
  };

  // Gestion de la soumission finale
  const onSubmit = (data) => {
    setShowResult(true);
    // Ici tu peux traiter ou afficher les réponses
    console.log("Réponses finales :", data);
  };

  // Pour garder la sélection lors du retour en arrière
  const selectedValue = watch(currentQuestion.name);

  // Affichage du questionnaire ou du résultat
  if (showResult) {
    // Recherche d'une fonction de résultat pour la dernière question répondue
    const lastKey = history[history.length - 1];
    const lastQuestion = questions[lastKey];
    let customResult = null;
    if (lastQuestion && typeof lastQuestion.result === "function") {
      customResult = lastQuestion.result(getValues());
    }

    return (
      <div>
        <h2>Merci pour vos réponses !</h2>
        {customResult && <div style={{ marginBottom: "1em" }}>{customResult}</div>}
        <pre>{JSON.stringify(getValues(), null, 2)}</pre>
        <button onClick={() => window.location.reload()}>Recommencer</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group">
          <h1 className="main-title">{currentQuestion.label}</h1>
          {Array.isArray(currentQuestion.options) && currentQuestion.options.length > 0 ? (
            <div className="options-group">
              {/* Affiche les inputs seulement si pas validé */}
              {currentQuestion.type === "checkbox" && !checkboxValidated && (
                <>
                  {currentQuestion.options.map((option) => (
                    <div key={option.value} className="option-row">
                      <input
                        type="checkbox"
                        value={option.value}
                        {...register(currentQuestion.name, { required: true })}
                        checked={Array.isArray(selectedValue) && selectedValue.includes(option.value)}
                        onChange={(e) => {
                          const oldValues = Array.isArray(selectedValue) ? selectedValue : [];
                          if (e.target.checked) {
                            setValue(currentQuestion.name, [...oldValues, option.value]);
                          } else {
                            setValue(
                              currentQuestion.name,
                              oldValues.filter((v) => v !== option.value)
                            );
                          }
                          setCheckboxResult(null);
                          setCheckboxValidated(false); // Permet de revalider après retour ou modification
                        }}
                        id={`${currentQuestion.name}_${option.value}`}
                      />
                      <label htmlFor={`${currentQuestion.name}_${option.value}`}>{option.label}</label>
                    </div>
                  ))}
                  <button
                    type="button"
                    style={{ marginTop: "1em" }}
                    onClick={() => {
                      if (typeof currentQuestion.result === "function") {
                        setCheckboxResult(currentQuestion.result(getValues()));
                        setCheckboxValidated(true);
                      }
                    }}
                  >
                    Valider
                  </button>
                </>
              )}
              {/* Affiche le résultat si validé */}
              {currentQuestion.type === "checkbox" && checkboxValidated && checkboxResult && (
                <div style={{ marginTop: "1em", color: "#2c3e50", fontWeight: "bold" }}>
                  {checkboxResult}
                </div>
              )}
              {/* Pour les radios */}
              {currentQuestion.type !== "checkbox" &&
                currentQuestion.options.map((option) => (
                  <div key={option.value} className="option-row">
                    <input
                      type="radio"
                      value={option.value}
                      {...register(currentQuestion.name, { required: true })}
                      checked={selectedValue === option.value}
                      onChange={() => {
                        setValue(currentQuestion.name, option.value);
                        if (option.next === "fin") {
                          setShowResult(true);
                        } else {
                          nextStep(option.value);
                        }
                      }}
                      id={`${currentQuestion.name}_${option.value}`}
                    />
                    <label htmlFor={`${currentQuestion.name}_${option.value}`}>{option.label}</label>
                  </div>
                ))}
            </div>
          ) : (
            <div style={{ color: "red" }}>
              Aucune option disponible pour cette question.
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: "1em" }}>
        {/* Affiche "Valider" uniquement sur la dernière question radio */}
        {currentQuestion.type !== "checkbox" &&
          currentQuestion.options?.some((opt) => opt.next === "fin") &&
          selectedValue &&
          currentQuestion.options?.find((opt) => opt.value === selectedValue)?.next === "fin" && (
            <button type="submit" style={{ marginLeft: "1em" }}>
              Valider
            </button>
          )}
      </div>
      {history.length > 1 && (
        <button type="button" onClick={prevStep} className="prev-btn">
          Précédent
        </button>
      )}
    </form>
  );
}

export default App;