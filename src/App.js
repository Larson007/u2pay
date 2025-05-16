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

  const currentQuestion = questions[currentKey];

  // Pour revenir en arrière
  const prevStep = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentKey(newHistory[newHistory.length - 1]);
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
      <div>
        <label>{currentQuestion.label}</label>
        {Array.isArray(currentQuestion.options) && currentQuestion.options.length > 0 ? (
          currentQuestion.type === "checkbox" ? (
            <>
              {currentQuestion.options.map((option) => (
                <div key={option.value}>
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
                    }}
                  />
                  {option.label}
                </div>
              ))}
              <button type="submit" style={{ marginTop: "1em" }}>
                Valider
              </button>
            </>
          ) : (
            currentQuestion.options.map((option) => (
              <div key={option.value}>
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
                />
                {option.label}
              </div>
            ))
          )
        ) : (
          <div style={{ color: "red" }}>
            Aucune option disponible pour cette question.
          </div>
        )}
      </div>
      <div style={{ marginTop: "1em" }}>
        {history.length > 1 && (
          <button type="button" onClick={prevStep}>
            Précédent
          </button>
        )}
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
    </form>
  );
}

export default App;