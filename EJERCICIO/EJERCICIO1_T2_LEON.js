###EJERCICIO
  {"cells": [ {
 
  "cell_type": "markdown",
   "id": "ad3a6aed",
   "metadata": {},
   "source": [
     "  # Datos suministrados "]},
  

  { "cell_type": "code",
   "execution_count": 1,
   "id": "673f018c",
   "metadata": {},
    "outputs": [],
    "source": [
    "import numpy as np\n",
    "import sympy as sp\n",
    "import pandas as pd"},
   ]

  {
   "cell_type": "code",
   "execution_count": 2,
   "id": "f2fc242c",
   "metadata": {},
   "outputs": [],
   "source": [
    "## Datos del codigo de estudiante \n",
    "\n",
    "x = 2 + 1 + 9 + 4 + 0 + 3 + 9\n",
    "y = x / 3\n",
    "# Longitud barra AB\n",
    "\n",
    "L1 = 0.05 * x\n",
    "L2 = L1 * (3 / 2)\n",
    "L3 = L1 / 2\n",
    "\n",
    "# Longitud de la barra\n",
    "\n",
    "L = L1 + L2 + L3\n",
    "\n",
    "# Cargas \n",
    "P = x / 20\n",
    "W = (x / 200) + (y / 100)\n",
    "\n",
    "# Angulo del cable\n",
    "\n",
    "angulo_cable = 45 * np.pi / 180"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "id": "47370e34",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Ingrese L1 en metros: 0.85\n",
      "Ingrese L2 en metros: 1.275\n",
      "Ingrese L3 en metros: 0.425\n",
      "Ingrese L en metros: 2.55\n",
      "Ingrese w en kN / m: 0.142\n",
      "Ingrese P en kN: 0.85\n"
     ]
    }

   ],
   "source": [
    "D_viga = {\n",
    "    \"L1\": \"metros\",\n",
    "    \"L2\": \"metros\",\n",
    "    \"L3\": \"metros\",\n",
    "    \"L\": \"metros\",\n",
    "    \"w\": \"kN / m\",\n",
    "    \"P\": \"kN\",\n",
    "}\n",
    "\n",
    "for llave, valor in D_viga.items():\n",
    " while True:\n",
    " try:\n",
    " D_viga[llave] = float(input(f\"Ingrese {llave} en {valor}: \"))\n",
    " break\n",
    " except:\n",
    " print(f\"Ingrese correctamente el dato {llave} con su unidad en {valor}\")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "id": "bfd65638",
   "metadata": {},
   "outputs": [
    {
     "data": {
    "text/plain": [
    "{'L1': 0.85, 'L2': 1.275, 'L3': 0.425, 'L': 2.55, 'w': 0.142, 'P': 0.85}"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "D_viga"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "830a6b6c",
   "metadata": {},
   "source": [
    "# Ecuaciones de equilibrio."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "id": "9f1666e9",
   "metadata": {},
   "outputs": [],
   "source": [
    "Ax, Ay, Ma, x = sp.symbols(\"Ax Ay Ma x\")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "id": "171983e5",
   "metadata": {},
   "outputs": [
    {
     "data": {
     "text/latex": [
    "$\\displaystyle 0.601040764008565$"
      ],
    "text/plain": [
     "0.601040764008565"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# Sumatoria de fuerzas en x [kN]\n",
    "\n",
    "Equi_x = Ax - (D_viga[\"P\"] * sp.cos(angulo_cable))\n",
    "Ecua_x = sp.Eq(Equi_x, 0)\n",
    "Ax =  sp.solve(Ecua_x)[0]\n",
    "Ax "
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "id": "b008af89",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/latex": [
       "$\\displaystyle -0.329465764008565$"
      ],
      "text/plain": [
       "-0.329465764008565"
      ]
     },
     "execution_count": 7,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# Sumatoria de fuerzas en y [kN]\n",
    "\n",
    "Equi_y = Ay + (D_viga[\"P\"] * sp.sin(angulo_cable)) - ((D_viga[\"w\"] * D_viga[\"L1\"]) / 2) - ((D_viga[\"w\"] * D_viga[\"L3\"]) / 2) - (D_viga[\"w\"] * D_viga[\"L2\"]) \n",
    "Ecua_y = sp.Eq(Equi_y, 0)\n",
    "Ay =  sp.solve(Ecua_y)[0]\n",
    "Ay "
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "id": "e188805e",
   "metadata": {},
   "outputs": [
    {
     "data": {
     "text/latex": [
     "$\\displaystyle -1.16074707322184$"
    ],
      "text/plain": [
     "-1.16074707322184"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# sumatoria de momentos en A [kN*m]\n",
    "\n",
    "Equi_moment =  Ma + (D_viga[\"P\"] * sp.sin(angulo_cable) * D_viga[\"L\"]) - (((D_viga[\"w\"] * D_viga[\"L1\"]) / 2) * (2/3) * (D_viga[\"L1\"])) -(((D_viga[\"w\"] * D_viga[\"L3\"]) / 2) * (D_viga[\"L\"] - ((2/3)*D_viga[\"L3\"]))) - ((D_viga[\"w\"] * D_viga[\"L2\"]) * (D_viga[\"L1\"] + (D_viga[\"L2\"]/2)))\n",
    "Ecua_moment = sp.Eq(Equi_moment, 0)\n",
    "Ma =  sp.solve(Ecua_moment)[0]\n",
    "Ma"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "86c14934",
   "metadata": {},
   "source": [
    "# Fuerzas internas."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 9,
   "id": "eb5413b1",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/latex": [
       "$\\displaystyle - 0.027843137254902 x^{3} - 0.329465764008565 x + 1.16074707322184$"
      ],
      "text/plain": [
       "-0.027843137254902*x**3 - 0.329465764008565*x + 1.16074707322184"
      ]
     },
     "execution_count": 9,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# tramo AC con x=0 en A, 0 <= x <= L1\n",
    "\n",
    "carga_distribuida = (D_viga[\"w\"] * x) / D_viga[\"L1\"]\n",
    "\n",
    "# Fuerza cortante y momento flector para AC\n",
    "\n",
    "Vx_1 = Ay - sp.integrate(carga_distribuida, x)\n",
    "\n",
    "Mx_1 = - Ma + sp.integrate(Vx_1, x)\n",
    "Mx_1"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "id": "ceb31a92",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/latex": [
       "$\\displaystyle - 0.071 x^{2} - 0.389815764008565 x + 0.863602007147893$"
      ],
      "text/plain": [
       "-0.071*x**2 - 0.389815764008565*x + 0.863602007147893"
      ]
     },
     "execution_count": 10,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# tramo CD con x=0 en C, 0 <= x <= L2\n",
    "\n",
    "carga_distribuida = D_viga[\"w\"] \n",
    "\n",
    "# Fuerza cortante y momento flector para CD\n",
    "\n",
    "Vx_2 = - sp.integrate(carga_distribuida, x) + Vx_1.subs(x, D_viga[\"L1\"])\n",
    "\n",
    "Mx_2 = sp.integrate(Vx_2, x) + Mx_1.subs(x, D_viga[\"L1\"])\n",
    "Mx_2"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 11,
   "id": "7e90d15c",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/latex": [
       "$\\displaystyle 0.0556862745098039 x^{3} - 0.071 x^{2} - 0.570865764008565 x + 0.251167533036973$"
      ],
      "text/plain": [
       "0.0556862745098039*x**3 - 0.071*x**2 - 0.570865764008565*x + 0.251167533036973"
      ]
     },
     "execution_count": 11,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# tramo DB con x=0 en D, 0 <= x <= L3\n",
    "\n",
    "carga_distribuida =  (- (D_viga[\"w\"] / D_viga[\"L3\"]) * x) + D_viga[\"w\"]\n",
    "\n",
    "# Fuerza cortante y momento flector para DB\n",
    "\n",
    "Vx_3 = - sp.integrate(carga_distribuida, x) + Vx_2.subs(x, D_viga[\"L2\"]) \n",
    "\n",
    "Mx_3 = sp.integrate(Vx_3, x) + Mx_2.subs(x, D_viga[\"L2\"])\n",
    "Mx_3"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "b56927bb",
   "metadata": {},
   "source": [
    "# Solucion inciso 1."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "id": "bc9671f3",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "image/png": "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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    },
    {
     "data": {
      "text/plain": [
       "<sympy.plotting.plot.Plot at 0x1fd2bf2f520>"
      ]
     },
     "execution_count": 12,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# Grafica de fuerza cortante\n",
    "x_array = np.arange(0, D_viga[\"L\"] + 0.01, 0.01)\n",
    "\n",
    "Tramo_1 = sp.lambdify(x, Vx_1)(x_array[x_array <= D_viga[\"L1\"]])\n",
    "Tramo_2 = sp.lambdify(x, Vx_2)(x_array[(x_array > D_viga[\"L1\"]) & (x_array <= (D_viga[\"L1\"] + D_viga[\"L2\"]))] - D_viga[\"L1\"])\n",
    "Tramo_3 = sp.lambdify(x, Vx_3)(x_array[x_array >( D_viga[\"L1\"] + D_viga[\"L2\"]) - D_viga[\"L1\"] - D_viga[\"L2\"]])\n",
    "\n",
    "Corty = np.concatenate((Tramo_1, Tramo_2, Tramo_3))\n",
    "sp.plot((Vx_1, (x, 0, D_viga[\"L1\"])), (Vx_2.subs(x, x - D_viga[\"L1\"]), (x, D_viga[\"L1\"], D_viga[\"L1\"] + D_viga[\"L2\"])), (Vx_3.subs(x, x - (D_viga[\"L1\"] + D_viga[\"L2\"])), (x, D_viga[\"L1\"] + D_viga[\"L2\"], D_viga[\"L\"])), line_color=\"Brown\")\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 13,
   "id": "583df27e",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "image/png": "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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    },
    {
     "data": {
     "text/plain": [
       "<sympy.plotting.plot.Plot at 0x1fd2dcd8070>"
      ]
     },
     "execution_count": 13,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# Momento flector en kN-m\n",
    "x_array = np.arange(0, D_viga[\"L\"] + 0.01, 0.01)\n",
    "\n",
    "#Funcion de cada tramo (T)\n",
    "Tramo_1 = sp.lambdify(x, Mx_1)(x_array[x_array <= D_viga[\"L1\"]])\n",
    "Tramo_2 = sp.lambdify(x, Mx_2)(x_array[(x_array > D_viga[\"L1\"]) & (x_array <= (D_viga[\"L1\"] + D_viga[\"L2\"]))] - D_viga[\"L1\"])\n",
    "Tramo_3 = sp.lambdify(x, Mx_3)(x_array[x_array >( D_viga[\"L1\"] + D_viga[\"L2\"]) - D_viga[\"L1\"] - D_viga[\"L2\"]])\n",
    "\n",
    "Momenty = np.concatenate((Tramo_1, Tramo_2, Tramo_3))\n",
    "sp.plot((Mx_1, (x, 0, D_viga[\"L1\"])), (Mx_2.subs(x, x - D_viga[\"L1\"]), (x, D_viga[\"L1\"], D_viga[\"L1\"] + D_viga[\"L2\"])), (Mx_3.subs(x, x - (D_viga[\"L1\"] + D_viga[\"L2\"])), (x, D_viga[\"L1\"] + D_viga[\"L2\"], D_viga[\"L\"])), line_color=\"purple\")\n"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "94bdda3a",
   "metadata": {},
   "source": [
    "# Solucion inciso 2."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 18,
   "id": "1d6712f8",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "El valor del cortante máximo es igual a -0.6010365875379767 kN\n",
      "Se ubica a 2.54 metros desde A\n"
     ]
    }
   ],
   "source": [
    "### Maxima fuerza contante [KN]\n",
    "\n",
    "def obtener_maximo(Val_diagrama):\n",
    "    Vmax_positivo = np.amax(Val_diagrama)\n",
    "    Vmax_negativo = np.amin(Val_diagrama)\n",
    "\n",
    "    Vmax = Vmax_positivo\n",
    "    if np.absolute(Vmax_negativo) > Vmax_positivo:\n",
    "        Vmax = Vmax_negativo\n",
    "    \n",
    "    ubicacion = x_array[np.where(Val_diagrama == Vmax)][0]\n",
    "    return Vmax, ubicacion\n",
    "\n",
    "cort_max, ubicacion_cort_max = obtener_maximo(Corty)\n",
    "print(f\"El valor del cortante máximo es igual a {cort_max} kN\")\n",
    "print(f\"Se ubica a {ubicacion_cort_max} metros desde A\")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 22,
   "id": "a7bf7c12",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "1.16074707322184"
      ]
     },
     "execution_count": 22,
     "metadata": {},
     "output_type": "execute_result"
    }

   ],
   "source": [
    "## Momento flector en kN-m\n",
    "\n",
    "Momentmax = 0\n",
    "Momentmax_positivo = np.amax(Momenty)\n",
    "Momentmax_negativo = np.amin(Momenty)\n",
    "\n",
    "if np.abs(Momentmax_negativo) > Momentmax_positivo:\n",
    "    Mmax = np.abs(Momentmax_negativo)\n",
    "else: \n",
    "    Mmax = Momentmax_positivo\n",
    "\n",
    "Mmax"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "e6d03d99",
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3 (ipykernel)",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3

   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.10.0"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}