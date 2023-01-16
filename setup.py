from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in erpsuite/__init__.py
from erpsuite import __version__ as version

setup(
	name="erpsuite",
	version=version,
	description="A frappe app that helps companies manage their income and expenses by providing reports, charts, and other tools. With the Business owner as the end-user.",
	author="efeone",
	author_email="info@efeone.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
