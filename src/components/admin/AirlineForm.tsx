import { useState, useEffect } from 'react';
import type { Airline, TransportMethod, TransportConditions } from '../../types';

interface AirlineFormProps {
  airline?: Airline;
  onSubmit: (airline: Airline) => Promise<void>;
  onCancel: () => void;
}

const TRANSPORT_METHODS: TransportMethod[] = ['cabin', 'baggage', 'cargo'];

const TRANSPORT_METHOD_LABELS: Record<TransportMethod, string> = {
  cabin: 'В салоне',
  baggage: 'В багаже',
  cargo: 'Карго',
};

export function AirlineForm({ airline, onSubmit, onCancel }: AirlineFormProps) {
  const [formData, setFormData] = useState<Airline>({
    id: '',
    name: '',
    logo: '✈️',
    transportMethods: [],
    conditions: {},
    rulesUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (airline) {
      setFormData(airline);
    }
  }, [airline]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // ID validation
    if (!formData.id.trim()) {
      errors.id = 'ID обязателен';
    } else if (!/^[a-z0-9-]+$/.test(formData.id)) {
      errors.id = 'ID может содержать только строчные буквы, цифры и дефис';
    } else if (formData.id.length < 2) {
      errors.id = 'ID должен содержать минимум 2 символа';
    } else if (formData.id.length > 50) {
      errors.id = 'ID не должен превышать 50 символов';
    }

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Название обязательно';
    } else if (formData.name.length < 2) {
      errors.name = 'Название должно содержать минимум 2 символа';
    } else if (formData.name.length > 100) {
      errors.name = 'Название не должно превышать 100 символов';
    }

    // Logo validation
    if (!formData.logo.trim()) {
      errors.logo = 'Логотип обязателен';
    } else if (formData.logo.length > 10) {
      errors.logo = 'Логотип не должен превышать 10 символов';
    }

    // URL validation
    if (formData.rulesUrl && formData.rulesUrl.trim()) {
      try {
        new URL(formData.rulesUrl);
      } catch {
        errors.rulesUrl = 'Введите корректный URL (например: https://airline.com/rules)';
      }
    } else {
      errors.rulesUrl = 'Ссылка на правила обязательна';
    }

    // Transport methods validation
    if (formData.transportMethods.length === 0) {
      errors.transportMethods = 'Выберите хотя бы один способ перевозки';
    }

    // Conditions validation
    formData.transportMethods.forEach(method => {
      const conditions = formData.conditions[method];
      if (!conditions || Object.keys(conditions).length === 0) {
        errors[`conditions_${method}`] = `Заполните хотя бы одно поле для способа перевозки "${TRANSPORT_METHOD_LABELS[method]}"`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleMethodToggle = (method: TransportMethod) => {
    setFormData(prev => {
      const methods = prev.transportMethods.includes(method)
        ? prev.transportMethods.filter(m => m !== method)
        : [...prev.transportMethods, method];

      // Remove conditions if method is unchecked
      const conditions = { ...prev.conditions };
      if (!methods.includes(method)) {
        delete conditions[method];
      }

      return { ...prev, transportMethods: methods, conditions };
    });
  };

  const handleConditionChange = (
    method: TransportMethod,
    field: keyof TransportConditions,
    value: string | string[]
  ) => {
    setFormData(prev => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        [method]: {
          ...prev.conditions[method],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    // Client-side validation
    if (!validateForm()) {
      setError('Пожалуйста, исправьте ошибки в форме');
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Form submission error:', err);
      
      // Parse error message
      let errorMessage = 'Произошла неизвестная ошибка';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        
        // Check for specific backend errors
        if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
          errorMessage = `Авиакомпания с ID "${formData.id}" уже существует`;
        } else if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
          errorMessage = 'Проверьте правильность заполнения всех полей';
        } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
          errorMessage = 'Ошибка соединения. Проверьте интернет и попробуйте снова';
        } else if (errorMessage.includes('500') || errorMessage.includes('Internal')) {
          errorMessage = 'Ошибка сервера. Попробуйте позже или обратитесь к администратору';
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {airline ? 'Редактировать авиакомпанию' : 'Добавить авиакомпанию'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID авиакомпании *
          </label>
          <input
            type="text"
            value={formData.id}
            onChange={e => {
              setFormData(prev => ({ ...prev, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }));
              setValidationErrors(prev => ({ ...prev, id: '' }));
            }}
            disabled={!!airline}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${
              validationErrors.id ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="aeroflot"
            required
          />
          {validationErrors.id && (
            <p className="text-sm text-red-600 mt-1">{validationErrors.id}</p>
          )}
          {!!airline ? (
            <p className="text-sm text-gray-500 mt-1">ID нельзя изменить</p>
          ) : (
            <p className="text-sm text-gray-500 mt-1">Только строчные буквы, цифры и дефис (2-50 символов)</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Название *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e => {
              setFormData(prev => ({ ...prev, name: e.target.value }));
              setValidationErrors(prev => ({ ...prev, name: '' }));
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Аэрофлот"
            maxLength={100}
            required
          />
          {validationErrors.name && (
            <p className="text-sm text-red-600 mt-1">{validationErrors.name}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">{formData.name.length}/100 символов</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Логотип (эмодзи) *
          </label>
          <input
            type="text"
            value={formData.logo}
            onChange={e => {
              setFormData(prev => ({ ...prev, logo: e.target.value }));
              setValidationErrors(prev => ({ ...prev, logo: '' }));
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.logo ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="✈️"
            maxLength={10}
            required
          />
          {validationErrors.logo && (
            <p className="text-sm text-red-600 mt-1">{validationErrors.logo}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ссылка на правила *
          </label>
          <input
            type="url"
            value={formData.rulesUrl || ''}
            onChange={e => {
              setFormData(prev => ({ ...prev, rulesUrl: e.target.value }));
              setValidationErrors(prev => ({ ...prev, rulesUrl: '' }));
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.rulesUrl ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://airline.com/rules"
            required
          />
          {validationErrors.rulesUrl && (
            <p className="text-sm text-red-600 mt-1">{validationErrors.rulesUrl}</p>
          )}
        </div>
      </div>

      {/* Transport Methods */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Способы перевозки *
        </label>
        <div className="space-y-2">
          {TRANSPORT_METHODS.map(method => (
            <label key={method} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.transportMethods.includes(method)}
                onChange={() => {
                  handleMethodToggle(method);
                  setValidationErrors(prev => ({ ...prev, transportMethods: '' }));
                }}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span>{TRANSPORT_METHOD_LABELS[method]}</span>
            </label>
          ))}
        </div>
        {validationErrors.transportMethods && (
          <p className="text-sm text-red-600 mt-1">{validationErrors.transportMethods}</p>
        )}
      </div>

      {/* Conditions for each method */}
      {formData.transportMethods.map(method => (
        <div key={method} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">
            Условия: {TRANSPORT_METHOD_LABELS[method]}
          </h3>

          {validationErrors[`conditions_${method}`] && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              {validationErrors[`conditions_${method}`]}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Размер переноски
              </label>
              <input
                type="text"
                value={formData.conditions[method]?.maxCarrierSize || ''}
                onChange={e => {
                  handleConditionChange(method, 'maxCarrierSize', e.target.value);
                  setValidationErrors(prev => ({ ...prev, [`conditions_${method}`]: '' }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="55x40x25 см"
              />
              <p className="text-xs text-gray-500 mt-1">Например: 55x40x25 см или До 120×80×85 см</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Максимальный вес
              </label>
              <input
                type="text"
                value={formData.conditions[method]?.maxWeight || ''}
                onChange={e => {
                  handleConditionChange(method, 'maxWeight', e.target.value);
                  setValidationErrors(prev => ({ ...prev, [`conditions_${method}`]: '' }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="8 кг"
              />
              <p className="text-xs text-gray-500 mt-1">Например: 8 кг или До 32 кг (вместе с переноской)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Допустимые животные (через запятую)
              </label>
              <input
                type="text"
                value={formData.conditions[method]?.allowedAnimals?.join(', ') || ''}
                onChange={e => {
                  handleConditionChange(
                    method,
                    'allowedAnimals',
                    e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  );
                  setValidationErrors(prev => ({ ...prev, [`conditions_${method}`]: '' }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="собаки, кошки, птицы"
              />
              <p className="text-xs text-gray-500 mt-1">Перечислите животных через запятую</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дополнительная информация
              </label>
              <textarea
                value={formData.conditions[method]?.additionalInfo || ''}
                onChange={e => {
                  handleConditionChange(method, 'additionalInfo', e.target.value);
                  setValidationErrors(prev => ({ ...prev, [`conditions_${method}`]: '' }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Дополнительные требования и ограничения"
              />
              <p className="text-xs text-gray-500 mt-1">Любая дополнительная информация о перевозке</p>
            </div>
          </div>
        </div>
      ))}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Сохранение...' : airline ? 'Обновить' : 'Создать'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
