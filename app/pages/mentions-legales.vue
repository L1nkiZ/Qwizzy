<template>
	<UContainer class="max-w-4xl py-12">
		<h1 class="mb-8 text-4xl font-bold">Mentions Légales</h1>

		<div class="space-y-8">
			<!-- Éditeur du site -->
			<section>
				<h2 class="mb-4 text-2xl font-semibold">1. Éditeur du site</h2>
				<div class="space-y-2 text-gray-700 dark:text-gray-300">
					<p>
						<strong>Nom du site :</strong>
						Qwizzy
					</p>
					<p>
						<strong>Raison sociale :</strong>
						[À compléter]
					</p>
					<p>
						<strong>Forme juridique :</strong>
						[À compléter]
					</p>
					<p>
						<strong>Capital social :</strong>
						[À compléter] €
					</p>
					<p>
						<strong>Siège social :</strong>
						[À compléter]
					</p>
					<p>
						<strong>SIRET :</strong>
						[À compléter]
					</p>
					<p>
						<strong>RCS :</strong>
						[À compléter]
					</p>
					<p>
						<strong>Numéro de TVA :</strong>
						[À compléter]
					</p>
					<p>
						<strong>Directeur de la publication :</strong>
						[À compléter]
					</p>
					<p>
						<strong>Contact :</strong>
						<NuxtLink
							to="/contact"
							class="text-primary underline hover:no-underline"
						>
							Formulaire de contact
						</NuxtLink>
					</p>
				</div>
			</section>

			<!-- Hébergement -->
			<section>
				<h2 class="mb-4 text-2xl font-semibold">2. Hébergement</h2>
				<div class="space-y-2 text-gray-700 dark:text-gray-300">
					<p>
						<strong>Hébergeur :</strong>
						[À compléter]
					</p>
					<p>
						<strong>Adresse :</strong>
						[À compléter]
					</p>
					<p>
						<strong>Téléphone :</strong>
						[À compléter]
					</p>
				</div>
			</section>

			<!-- Objet du site -->
			<section>
				<h2 class="mb-4 text-2xl font-semibold">3. Objet du site</h2>
				<div class="space-y-2 text-gray-700 dark:text-gray-300">
					<p>
						Le site Qwizzy est une plateforme de quiz en ligne permettant aux
						utilisateurs de :
					</p>
					<ul class="ml-6 list-disc space-y-1">
						<li>Jouer à des quiz en ligne sans création de compte</li>
						<li>Créer un compte utilisateur pour enregistrer leurs scores</li>
						<li>Consulter l'historique de leurs performances</li>
						<li>Accéder à différentes catégories de quiz</li>
					</ul>
				</div>
			</section>

			<!-- Propriété intellectuelle -->
			<section>
				<h2 class="mb-4 text-2xl font-semibold">4. Propriété intellectuelle</h2>
				<div class="space-y-2 text-gray-700 dark:text-gray-300">
					<p>
						L'ensemble du contenu de ce site (structure, textes, logos, images,
						vidéos, quiz, questions, etc.) est la propriété exclusive de Qwizzy
						ou de ses partenaires.
					</p>
					<p>
						Toute reproduction, distribution, modification, adaptation,
						retransmission ou publication, même partielle, de ces différents
						éléments est strictement interdite sans l'accord exprès par écrit de
						Qwizzy.
					</p>
					<p>
						Cette représentation ou reproduction, par quelque procédé que ce
						soit, constitue une contrefaçon sanctionnée par les articles L.335-2
						et suivants du Code de la propriété intellectuelle.
					</p>
				</div>
			</section>

			<!-- Données personnelles -->
			<section>
				<h2 class="mb-4 text-2xl font-semibold">5. Données personnelles</h2>
				<div class="space-y-2 text-gray-700 dark:text-gray-300">
					<p>
						Conformément au Règlement Général sur la Protection des Données
						(RGPD) et à la loi Informatique et Libertés, vous disposez d'un
						droit d'accès, de rectification, de suppression et d'opposition aux
						données personnelles vous concernant.
					</p>
					<p>
						Pour plus d'informations sur la collecte et le traitement de vos
						données personnelles, veuillez consulter notre
						<NuxtLink
							to="/politique-de-confidentialite"
							class="text-primary underline hover:no-underline"
						>
							Politique de confidentialité
						</NuxtLink>
						.
					</p>
				</div>
			</section>

			<!-- Cookies -->
			<section>
				<h2 class="mb-4 text-2xl font-semibold">6. Cookies</h2>
				<div class="space-y-2 text-gray-700 dark:text-gray-300">
					<p>
						Le site Qwizzy utilise des cookies pour améliorer l'expérience
						utilisateur et mémoriser vos préférences.
					</p>
					<p>Les cookies utilisés permettent de :</p>
					<ul class="ml-6 list-disc space-y-1">
						<li>Maintenir votre session de connexion</li>
						<li>Mémoriser vos préférences d'affichage</li>
						<li>Enregistrer vos scores lorsque vous êtes connecté</li>
						<li>Analyser l'utilisation du site (statistiques)</li>
					</ul>
					<p>
						Vous pouvez à tout moment désactiver les cookies depuis les
						paramètres de votre navigateur.
					</p>
				</div>
			</section>

			<!-- Limitation de responsabilité -->
			<section>
				<h2 class="mb-4 text-2xl font-semibold">
					7. Limitation de responsabilité
				</h2>
				<div class="space-y-2 text-gray-700 dark:text-gray-300">
					<p>
						Qwizzy s'efforce d'assurer l'exactitude et la mise à jour des
						informations diffusées sur ce site, dont elle se réserve le droit de
						corriger, à tout moment et sans préavis, le contenu.
					</p>
					<p>
						Toutefois, Qwizzy ne peut garantir l'exactitude, la précision ou
						l'exhaustivité des informations mises à disposition sur ce site.
					</p>
					<p>En conséquence, Qwizzy décline toute responsabilité pour :</p>
					<ul class="ml-6 list-disc space-y-1">
						<li>
							Toute imprécision, inexactitude ou omission portant sur des
							informations disponibles sur le site
						</li>
						<li>
							Les dommages résultant d'une intrusion frauduleuse d'un tiers
							ayant entraîné une modification des informations
						</li>
						<li>
							Les dommages directs ou indirects résultant de l'utilisation du
							site
						</li>
						<li>L'indisponibilité temporaire ou totale du site</li>
					</ul>
				</div>
			</section>

			<!-- Liens hypertextes -->
			<section>
				<h2 class="mb-4 text-2xl font-semibold">8. Liens hypertextes</h2>
				<div class="space-y-2 text-gray-700 dark:text-gray-300">
					<p>
						Le site Qwizzy peut contenir des liens hypertextes vers d'autres
						sites. Qwizzy n'exerce aucun contrôle sur ces sites et décline toute
						responsabilité quant à leur contenu.
					</p>
					<p>
						La création de liens hypertextes vers le site Qwizzy est soumise à
						l'accord préalable de l'éditeur.
					</p>
				</div>
			</section>

			<!-- Droit applicable -->
			<section>
				<h2 class="mb-4 text-2xl font-semibold">
					9. Droit applicable et juridiction
				</h2>
				<div class="space-y-2 text-gray-700 dark:text-gray-300">
					<p>
						Les présentes mentions légales sont régies par le droit français.
					</p>
					<p>
						En cas de litige et à défaut d'accord amiable, le litige sera porté
						devant les tribunaux français conformément aux règles de compétence
						en vigueur.
					</p>
				</div>
			</section>

			<!-- Crédits -->
			<section>
				<h2 class="mb-4 text-2xl font-semibold">10. Crédits</h2>
				<div class="space-y-2 text-gray-700 dark:text-gray-300">
					<p><strong>Conception et développement :</strong></p>
					<ul class="ml-6 list-disc space-y-1">
						<li>Framework : Nuxt 4</li>
						<li>UI Library : Nuxt UI v4</li>
						<li>Styling : TailwindCSS</li>
					</ul>
				</div>
			</section>

			<!-- Date de mise à jour -->
			<section>
				<div class="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
					<p class="text-sm text-gray-600 dark:text-gray-400">
						<strong>Dernière mise à jour :</strong>
						7 novembre 2025
					</p>
				</div>
			</section>
		</div>
	</UContainer>
</template>
