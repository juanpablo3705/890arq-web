'use client';

import React, { useActionState, useState } from 'react';
import { sendContactAction } from '@/actions/send-contact';
import type { ActionResponse } from '@/types/domain';

const INITIAL_STATE: ActionResponse = {
  success: false,
  message: '',
};

const REGIONES_CHILE = [
  'Región de Arica y Parinacota',
  'Región de Tarapacá',
  'Región de Antofagasta',
  'Región de Atacama',
  'Región de Coquimbo',
  'Región de Valparaíso',
  'Región Metropolitana de Santiago',
  "Región del Libertador Gral. Bernardo O'Higgins",
  'Región del Maule',
  'Región de Ñuble',
  'Región del Biobío',
  'Región de La Araucanía',
  'Región de Los Ríos',
  'Región de Los Lagos',
  'Región de Aysén',
  'Región de Magallanes',
];

const CHECKLIST_DOCUMENTOS = [
  'Dominio vigente de la propiedad',
  'Escritura de la propiedad',
  'Planimetría en formato digital',
  'Inscripción en el Conservador de Bienes Raíces',
  'Certificado de Informaciones Previas (CIP)',
  'Certificado de recepción anterior',
  'Certificado de Avalúo Fiscal Detallado',
];

export default function TasacionForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [region, setRegion] = useState('Región de Arica y Parinacota');
  const [direccion, setDireccion] = useState('');
  const [motivo, setMotivo] = useState('Venta');
  const [tipoPropiedad, setTipoPropiedad] = useState('Agrícola o Forestal');
  const [supTerreno, setSupTerreno] = useState('');
  const [supConstruida, setSupConstruida] = useState('');
  const [propietario, setPropietario] = useState('');
  const [rutPropietario, setRutPropietario] = useState('');
  const [habitaciones, setHabitaciones] = useState('');
  const [banos, setBanos] = useState('');
  const [estacionamientos, setEstacionamientos] = useState('');
  const [bodegas, setBodegas] = useState('');
  const [ventanas, setVentanas] = useState('');
  const [materialVentanas, setMaterialVentanas] = useState('');
  const [terrazas, setTerrazas] = useState('');

  const toggleDoc = (doc: string) => {
    setSelectedDocs((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(
    async (prevState, formData) => {
      const summary = [
        `SOLICITUD DE TASACIÓN / EVALUACIÓN DOM`,
        `Propietario: ${propietario || 'S/I'} (RUT: ${rutPropietario || 'S/I'})`,
        `Región: ${region} | Dirección: ${direccion}`,
        `Motivo: ${motivo} | Tipo: ${tipoPropiedad}`,
        `Sup. Terreno: ${supTerreno || '0'} m² | Sup. Construida: ${supConstruida || '0'} m²`,
        `Programa: Hab: ${habitaciones || '0'}, Baños: ${banos || '0'}, Est: ${estacionamientos || '0'}, Bod: ${bodegas || '0'}, Ventanas: ${ventanas || '0'} (${materialVentanas || 'S/I'}), Terrazas: ${terrazas || '0'}`,
        `Documentos disponibles: ${selectedDocs.length > 0 ? selectedDocs.join(', ') : 'Ninguno seleccionado'}`,
      ].join(' // ');

      formData.set('serviceType', 'Regularización');
      formData.set('locationComuna', `${direccion || 'Valparaíso'}, ${region}`);
      formData.set('message', summary);

      const result = await sendContactAction(prevState, formData);
      if (result.success) {
        setFullName('');
        setEmail('');
        setPhone('');
        setSelectedDocs([]);
        setDireccion('');
        setSupTerreno('');
        setSupConstruida('');
        setPropietario('');
        setRutPropietario('');
        setHabitaciones('');
        setBanos('');
        setEstacionamientos('');
        setBodegas('');
        setVentanas('');
        setMaterialVentanas('');
        setTerrazas('');
      }
      return result;
    },
    INITIAL_STATE
  );

  return (
    <form action={formAction} noValidate className="w-full max-w-[460px] space-y-5 font-mono text-xs">
      {state.message && (
        <div
          role={state.success ? 'status' : 'alert'}
          className={`p-3 border-2 ${
            state.success
              ? 'border-black bg-zinc-50 text-black'
              : 'border-[#DB0909] bg-red-50 text-[#DB0909]'
          }`}
        >
          {state.message}
        </div>
      )}

      {/* Nombre * */}
      <div>
        <label htmlFor="tasa-fullName" className="block font-bold mb-1.5 text-black">
          Nombre <span className="text-[#DB0909]">*</span>
        </label>
        <input
          id="tasa-fullName"
          name="fullName"
          type="text"
          required
          disabled={isPending}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="arq-input w-full"
        />
        {state.errors?.fullName?.[0] && (
          <p className="mt-2 text-xs text-[#DB0909] font-medium">{state.errors.fullName[0]}</p>
        )}
      </div>

      {/* Email * */}
      <div>
        <label htmlFor="tasa-email" className="block font-bold mb-1.5 text-black">
          Email <span className="text-[#DB0909]">*</span>
        </label>
        <input
          id="tasa-email"
          name="email"
          type="email"
          required
          disabled={isPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="arq-input w-full"
        />
        {state.errors?.email?.[0] && (
          <p className="mt-2 text-xs text-[#DB0909] font-medium">{state.errors.email[0]}</p>
        )}
      </div>

      {/* Número * */}
      <div>
        <label htmlFor="tasa-phone" className="block font-bold mb-1.5 text-black">
          Número <span className="text-[#DB0909]">*</span>
        </label>
        <input
          id="tasa-phone"
          name="phone"
          type="tel"
          required
          disabled={isPending}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="arq-input w-full"
        />
        {state.errors?.phone?.[0] && (
          <p className="mt-2 text-xs text-[#DB0909] font-medium">{state.errors.phone[0]}</p>
        )}
      </div>

      {/* Nombre propietario */}
      <div>
        <label htmlFor="tasa-propietario" className="block font-bold mb-1.5 text-black">
          Nombre propietario
        </label>
        <input
          id="tasa-propietario"
          type="text"
          disabled={isPending}
          value={propietario}
          onChange={(e) => setPropietario(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* RUT propietario */}
      <div>
        <label htmlFor="tasa-rut" className="block font-bold mb-1.5 text-black">
          RUT propietario
        </label>
        <input
          id="tasa-rut"
          type="text"
          disabled={isPending}
          value={rutPropietario}
          onChange={(e) => setRutPropietario(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* Región * */}
      <div>
        <label htmlFor="tasa-region" className="block font-bold mb-1.5 text-black">
          Región <span className="text-[#DB0909]">*</span>
        </label>
        <select
          id="tasa-region"
          disabled={isPending}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="arq-input w-full"
        >
          {REGIONES_CHILE.map((reg) => (
            <option key={reg} value={reg}>
              {reg}
            </option>
          ))}
        </select>
      </div>

      {/* Dirección * */}
      <div>
        <label htmlFor="tasa-direccion" className="block font-bold mb-1.5 text-black">
          Dirección <span className="text-[#DB0909]">*</span>
        </label>
        <input
          id="tasa-direccion"
          type="text"
          required
          disabled={isPending}
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* Motivo de la tasación */}
      <div>
        <label htmlFor="tasa-motivo" className="block font-bold mb-1.5 text-black">
          Motivo de la tasación
        </label>
        <select
          id="tasa-motivo"
          disabled={isPending}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="arq-input w-full"
        >
          <option value="Venta">Venta</option>
          <option value="Compra">Compra</option>
          <option value="Regularización Municipal">Regularización Municipal</option>
          <option value="Crédito Hipotecario / Garantía">Crédito Hipotecario / Garantía</option>
          <option value="Posesión Efectiva / Partición">Posesión Efectiva / Partición</option>
        </select>
      </div>

      {/* Superficie total del terreno */}
      <div>
        <label htmlFor="tasa-sup-terreno" className="block font-bold mb-1.5 text-black">
          Superficie total del terreno
        </label>
        <input
          id="tasa-sup-terreno"
          type="number"
          disabled={isPending}
          value={supTerreno}
          onChange={(e) => setSupTerreno(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* Superficie construida * */}
      <div>
        <label htmlFor="tasa-sup-construida" className="block font-bold mb-1.5 text-black">
          Superficie construida <span className="text-[#DB0909]">*</span>
        </label>
        <input
          id="tasa-sup-construida"
          type="number"
          required
          disabled={isPending}
          value={supConstruida}
          onChange={(e) => setSupConstruida(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* Número de habitaciones */}
      <div>
        <label htmlFor="tasa-hab" className="block font-bold mb-1.5 text-black">
          Número de habitaciones
        </label>
        <input
          id="tasa-hab"
          type="number"
          disabled={isPending}
          value={habitaciones}
          onChange={(e) => setHabitaciones(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* Número de baños */}
      <div>
        <label htmlFor="tasa-banos" className="block font-bold mb-1.5 text-black">
          Número de baños
        </label>
        <input
          id="tasa-banos"
          type="number"
          disabled={isPending}
          value={banos}
          onChange={(e) => setBanos(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* Número de estacionamientos */}
      <div>
        <label htmlFor="tasa-est" className="block font-bold mb-1.5 text-black">
          Número de estacionamientos
        </label>
        <input
          id="tasa-est"
          type="number"
          disabled={isPending}
          value={estacionamientos}
          onChange={(e) => setEstacionamientos(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* Número de bodegas */}
      <div>
        <label htmlFor="tasa-bod" className="block font-bold mb-1.5 text-black">
          Número de bodegas
        </label>
        <input
          id="tasa-bod"
          type="number"
          disabled={isPending}
          value={bodegas}
          onChange={(e) => setBodegas(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* Número de ventanas */}
      <div>
        <label htmlFor="tasa-vent" className="block font-bold mb-1.5 text-black">
          Número de ventanas
        </label>
        <input
          id="tasa-vent"
          type="number"
          disabled={isPending}
          value={ventanas}
          onChange={(e) => setVentanas(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* Material de las ventanas */}
      <div>
        <label htmlFor="tasa-mat-vent" className="block font-bold mb-1.5 text-black">
          Material de las ventanas
        </label>
        <input
          id="tasa-mat-vent"
          type="text"
          disabled={isPending}
          value={materialVentanas}
          onChange={(e) => setMaterialVentanas(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* Número de terrazas */}
      <div>
        <label htmlFor="tasa-terrazas" className="block font-bold mb-1.5 text-black">
          Número de terrazas
        </label>
        <input
          id="tasa-terrazas"
          type="number"
          disabled={isPending}
          value={terrazas}
          onChange={(e) => setTerrazas(e.target.value)}
          className="arq-input w-full"
        />
      </div>

      {/* Tipo de propiedad * */}
      <div>
        <label htmlFor="tasa-tipo" className="block font-bold mb-1.5 text-black">
          Tipo de propiedad <span className="text-[#DB0909]">*</span>
        </label>
        <select
          id="tasa-tipo"
          disabled={isPending}
          value={tipoPropiedad}
          onChange={(e) => setTipoPropiedad(e.target.value)}
          className="arq-input w-full"
        >
          <option value="Agrícola o Forestal">Agrícola o Forestal</option>
          <option value="Habitacional / Residencial">Habitacional / Residencial</option>
          <option value="Comercial / Oficinas">Comercial / Oficinas</option>
          <option value="Industrial / Bodega">Industrial / Bodega</option>
          <option value="Sitio Eriazo / Lote">Sitio Eriazo / Lote</option>
        </select>
      </div>

      {/* Checklist Municipal DOM idéntico a la captura 02-servicios-original.png */}
      <div className="pt-3" id="checklist-dom">
        <p className="font-bold text-black mb-2.5">
          ¿Posee los siguientes documentos? <span className="text-[#DB0909]">*</span>
        </p>
        <div className="space-y-2">
          {CHECKLIST_DOCUMENTOS.map((doc) => (
            <label
              key={doc}
              className="flex items-center gap-2.5 text-[12px] text-zinc-800 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                disabled={isPending}
                checked={selectedDocs.includes(doc)}
                onChange={() => toggleDoc(doc)}
                className="w-3.5 h-3.5 rounded-none border border-zinc-400 accent-black cursor-pointer"
              />
              <span>{doc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Botón Enviar idéntico a 02-servicios-original.png */}
      <div className="pt-3">
        <button type="submit" disabled={isPending} className="arq-submit-btn">
          {isPending ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </form>
  );
}
